import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fetchPost } from "@/lib/apis";
import Image from "next/image";
import Link from "next/link";

export default async function PostEditPage({ params }: { params: Promise<{ id: string }>}) {

  const { id } = await params;

  const post = await fetchPost(id);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mt-8 grid grid-cols-3 gap-1 md:grid-cols-2">
        <Image className="aspect-[1/1] w-full object-cover" src='/landscape.png' alt="post" width={640} height={640} />
        <div className="p-2">
          <h3 className="mb-2 font-semibold">Owner</h3>
          <div className="flex rounded border p-2">
            {post.user.image && (
              <Image className="block aspect-square size-12 rounded-full object-cover" src='/landscape.png' alt="user icon" width={96} height={96} />
            )}
            <div className="pl-4">
              <div>
                <p className="text-lg font-semibold">{post.user.name}</p>
                <p className="whitespace-pre-wrap text-sm font-medium">{post.user.description}</p>
              </div>
            </div>
          </div>
          <form>
            <h3 className="mt-2 font-semibold mb-2">Caption</h3>
            <Textarea name="caption" defaultValue={post.caption}></Textarea>
            <div className="mt-4 flex items-center">
              <Button type="submit">update</Button>
              <Link className="ml-4 rounded border p-2 text-sm" href={`/posts/${post.id}`}>back post</Link>
            </div>
          </form>
          <form className="mt-4">
            <Button type="submit" variant='destructive'>Delete</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
