import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className="text-xl text-gray-800 md:text-3xl md:leading-normal">Dog is Cute</p>
          <Link href='/register' className="flex items-center gap-5 rounded-lg bg-blue-800 px-6 py-3 text-sm font-medium text-white hover:bg-blue-600">Let&apos;s try now</Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image src='/landscape.png' alt="Desktop screenshot" width={1000} height={620} className="hidden md:block" />
          <Image src='/landscape.png' alt="mobile screenshot" width={560} height={760} className="block md:hidden" />
        </div>
      </div>
    </main>
  );
}
