import { fetchDashboard } from "@/lib/apis";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardPage() {

  const user = await fetchDashboard();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mt-8 flex p-4">
        {user.image && (
          <Image className="block aspect-[1/1] rounded-full object-cover" src='/landscape.png' alt="user icon" width={96} height={96} />
        )}
        {!user.image && (
          <Image className="block aspect-[1/1] rounded-full object-cover" src='/landscape.png' alt="user icon" width={96} height={96} />
        )}
        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="whitespace-pre-wrap font-medium">{user.description}</p>
          <div className="mt-4 flex">
            <p className="text-sm font-semibold">{user.posts.length} posts</p>
            <Link className="ml-2 rounded border px-2 text-sm font-semibold" href='/profile'>edit profile</Link> 
          </div>
        </div>
      </div>
      <div className="my-8 grid grid-cols-3 gap-1">
        {user.posts.map((post) => (
          <Link href={`/posts/${post.id}/edit`} key={post.id}>
            <Image className="aspect-[1/1] w-full object-cover" src='/landscape.png' alt="post" width={300} height={300} />
        </Link>
        ))}
      </div>
    </div>
  );
}
