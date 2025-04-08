'use client';

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { registerUser } from "@/lib/actions";
import { useActionState } from "react";

export default function RegisterForm() {
  const initialState = {
    errors: {},
    message: null,
  };

  const [state, action] = useActionState(registerUser, initialState);    

  return (
    <div>
      <form action={action}>
        <div>
          <Label className="text-sm font-medium text-gray-700">User Name</Label>
          <Input name="name" className="mt-1" />
          <div>
            {state.errors?.name && (
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-rose-600" key={error}>{error}</p>
              ))
            )}
          </div>
        </div>
        <div className="mt-4">
          <Label className="text-sm font-medium text-gray-700">Mail Address</Label>
          <Input className="mt-1" name="email" type="email" />
          <div>
            {state.errors?.email && (
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-rose-600" key={error}>{error}</p>
              ))
            )}
          </div>
        </div>
        <div className="mt-4">
          <Label className="text-sm font-medium text-gray-700">Password</Label>
          <Input className="mt-1" name="password" type="password" />
          <div>
            {state.errors?.password && (
              state.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-rose-600" key={error}>{error}</p>
              ))
            )}
          </div>
        </div>
        <div className="mt-4">
          <Label className="text-sm font-medium text-gray-700">Confirm Password</Label>
          <Input className="mt-1" name="confirmPassword" type="password" />
          <div>
            {state.errors?.confirmPassword && (
              state.errors.confirmPassword.map((error: string) => (
                <p className="mt-2 text-sm text-rose-600" key={error}>{error}</p>
              ))
            )}
          </div>
        </div>
        <div className="mt-8 flex items-center justify-end">
          <Button type="submit">Register</Button>
        </div>
      </form>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Already have an account?
        </p>
        <Link className={buttonVariants({ variant: 'outline' })} href='/login'>Login</Link>
      </div>
    </div>
  );
}
