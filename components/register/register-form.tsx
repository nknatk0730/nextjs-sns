import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
// import { registerUser } from "@/lib/actions";

export default function RegisterForm() {
  return (
    <div>
      <form action=''>
        <div>
          <Label className="text-sm font-medium text-gray-700">User Name</Label>
          <Input name="name" required className="mt-1" />
        </div>
        <div className="mt-4">
          <Label className="text-sm font-medium text-gray-700">Mail Address</Label>
          <Input className="mt-1" name="email" type="email" required />
        </div>
        <div className="mt-4">
          <Label className="text-sm font-medium text-gray-700">Password</Label>
          <Input className="mt-1" name="password" type="password" required minLength={8} />
        </div>
        <div className="mt-4">
          <Label className="text-sm font-medium text-gray-700">Confirm Password</Label>
          <Input className="mt-1" name="confirmPassword" type="password" required minLength={8} />
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
