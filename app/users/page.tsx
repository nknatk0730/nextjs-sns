import { fetchLatestUsers } from "@/lib/apis";
import Image from "next/image";
import Link from "next/link";

export default async function UsersPage() {

  const users = await fetchLatestUsers();

  return (
    <div className="mx-auto my-8 max-w-5xl shadow-sm">
      <div className="grid grid-cols-1 gap-1 lg:grid-cols-2">
        {users.map((user) => (
          <Link key={user.id} href={`/users/${user.id}`}>
            <div className="flex bg-gray-50 p-4">
              {user.image && (
                <Image className="block aspect-[1/1] rounded-full object-cover" src='/landscape.png' alt="user icon" width={96} height={96} />
              )}
              {!!user.image || (
                <Image className="block aspect-[1/1] rounded-full object-cover" src='/landscape.png' alt="user icon" width={96} height={96} />
              )}
              <div className="pl-4">
                <div>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="whitespace-pre-wrap font-medium">{user.description}</p>
                  <div className="mt-4 flex">
                    <p className="text-sm font-semibold">
                      {user._count.posts} Posts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
