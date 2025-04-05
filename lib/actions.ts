'use server';

import { redirect } from "next/navigation";
import prisma from "./prisma";
import * as argon2 from "argon2";
import { revalidatePath } from "next/cache";

export const registerUser = async (formData: FormData) => {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (user) {
    return 'User already exists';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }

  const hashedPassword = await argon2.hash(password);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return 'Error creating user';
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
  const email = 'alice@prisma.io';

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

  const name = formData.get('name') as string;
  const description = formData.get('description') as string | null;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name,
      description,
      image: user.image,
    },
  });

  redirect('/dashboard');
}