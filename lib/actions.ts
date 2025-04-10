'use server';

import { redirect } from "next/navigation";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { z } from "zod";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

const registerUserSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  confirmPassword: z.string().min(8, { message: 'Confirm password is required' }),
})
.refine((data) => {
  const { password, confirmPassword } = data;
  return password === confirmPassword;
}, {
  message: 'Passwords do not match',
  path: ['confirmPassword'], 
})
.refine(async (data) => {
  const { email } = data;
  const user = await prisma.user.findFirst({
    where: { email },
  });

  return !user;
}, {
  message: 'Email already exists',
  path: ['email'],
});

type RegisterUserState  = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  }
  message?: string | null;
}

type LoginUserState  = {
  success?: string | null;
  error?: string | null;
}

export const registerUser = async (state: RegisterUserState, formData: FormData): Promise<RegisterUserState> => {
  const validationResult = await registerUserSchema.safeParseAsync({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      message: 'Invalid input',
    }
  }

  const { name, email, password } = validationResult.data;


  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      errors: {},
      message: 'User created successfully',
    }
  } catch (error) {
    console.error('Error creating user:', error);
    return new Error('Error creating user');
  }
}

export const updatePost = async (formData: FormData) => {
  const postId = formData.get('postId') as string;
  const caption = formData.get('caption') as string;

  const email = 'alice@prisma.io';

  const user = await prisma.user.findFirstOrThrow({
    where: { email },
  });

  await prisma.post.update({
    where: { id: postId, userId: user.id },
    data: { caption },
  });

  redirect('/dashboard');
}

export const deletePost = async (formData: FormData) => {
  const postId = formData.get('postId') as string;
  const email = 'bob@prisma.io';

  const user = await prisma.user.findFirstOrThrow({
    where: { email },
  });

  await prisma.post.delete({
    where: {
      id: postId,
      userId: user.id,
    },
  });

  redirect('/dashboard');
}

export const createComment = async (postId: string, formData: FormData) => {
  const text = formData.get('text') as string;

  const email = 'alice@prisma.io';

  const user = await prisma.user.findFirstOrThrow({
    where: { email },
  });

  const post = await prisma.post.findFirstOrThrow({
    where: { id: postId },
  });

  await prisma.comment.create({
    data: {
      text,
      userId: user.id,
      postId: post.id,
    },
  });
  revalidatePath(`/posts/${postId}`);
}

export const updateMe = async (formData: FormData) => {
  const email = 'alice@prisma.io';

  const user = await prisma.user.findFirstOrThrow({
    where: { email },
  });

  const data = {
    name: formData.get('name') as string,
    description: formData.get('description') as string | null,
    image: user.image,
  }

  const image = formData.get('image') as File | null;
  if (image) {
      const blob = await put(image.name, image, {
        access: 'public',
      });

      data.image = blob.url;
  }

  await prisma.user.update({
    where: { id: user.id },
    data,
  });

  redirect('/dashboard');
}

export const createPost = async (formData: FormData) => {
  const email = 'alice@prisma.io';
  const caption = formData.get('caption') as string;
  const image = formData.get('image') as File;
  const blob = await put(image.name, image, {
    access: 'public',
  });

  const user = await prisma.user.findFirstOrThrow({
    where: { email },
  });

  await prisma.post.create({
    data: {
      caption,
      image: blob.url,
      userId: user.id,
    },
  });
  redirect('/dashboard');
}

export const login = async (
  state: LoginUserState,
  formData: FormData,
): Promise<LoginUserState> => {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await signIn("credentials", {
      email,
      password,
    });

    return { success: "Email sent" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
}

export const logout = async () => {
  await signOut();
  redirect('/login');
}