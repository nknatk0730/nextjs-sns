import RegisterForm from "@/components/register/register-form";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
      <div>
        <Image src='/landscape.png' alt="logo" width='80' height='30' />
      </div>
      <div className="mt-6 w-full overflow-hidden bg-gray-50 px-6 py-4 shadow-sm sm:max-w-md sm:rounded-lg">
        <RegisterForm />
      </div>
    </div>
  );
}
