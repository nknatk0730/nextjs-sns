import { fetchLatestPosts } from "@/lib/apis";
import Image from "next/image";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await fetchLatestPosts();

  return (
    <div className="mx-auto my-8 max-w-5xl">
      <div className="grid grid-cols-3 gap-1">
        {posts.map((post) => (
          <Link href={`/posts/${post.id}/edit`} key={post.id}>
            <Image className="aspect-[1/1] w-full object-cover" src={post.image} alt="post" width={300} height={300} />
            <div className="flex items-center justify-between border p-1">
              <div className="flex items-center">
                {post.user.image && (
                  <Image className="block aspect-square rounded-full object-cover" src='/landscape.png' alt="user icon" width={32} height={32} />
                )}
                <p className="ml-2 text-sm font-semibold">{post.user.name}</p>
              </div>
              <p className="hidden text-sm text-gray-500 md:block">{post.createdAt.toLocaleString('ja-JP')}</p>
            </div>
        </Link>
        ))}
      </div>
    </div>
  );
}
