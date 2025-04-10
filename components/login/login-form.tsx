'use client';

import { login } from "@/lib/actions";
import { useActionState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

const initialState = {
  success: null,
  error: null,
}

export const LoginForm = () => {
  const [state, action, isPending] = useActionState(login, initialState);
  return (
    <div>
      <form action={action} className={isPending ? 'opacity-50' : ''}>
        {state?.error && (
          <p className="mb-4 text-sm text-red-500">{state.error}</p>
        )}
        <div>
          <Label>Mail address</Label>
          <Input name="email" type="email" />
        </div>
        <div className="mt-4">
          <Label>Password</Label>
          <Input className="mt-1" name="password" type="password" />
        </div>
        <div className="mt-8 items-center">
          <Button disabled={isPending} className="ml-4" type="submit">Login</Button>
        </div>
      </form>
      <div className="mt-8 flex items-center justify-end">
        <Link className={buttonVariants({ variant: 'outline' })} href='register'>Register</Link>
      </div>
    </div>
  );
}