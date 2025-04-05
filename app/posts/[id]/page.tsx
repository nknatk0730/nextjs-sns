import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createComment } from "@/lib/actions";
import { fetchPostWithComments } from "@/lib/apis";
import Image from "next/image";
import Link from "next/link";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await fetchPostWithComments(id);
  const CreateCommentWithPostId = createComment.bind(null, id);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mt-8 grid grid-cols-1 gap-1 md:grid-cols-2">
        <Image className="aspect-[1/1] w-full object-cover" src='/landscape.png' alt="post" width={640} height={640} />
        <div className="p-2">
          <div>
            <h3 className="font-semibold">Owner</h3>
            <div className="text-sm text-gray-500">
              {post.createdAt.toLocaleString('ja-JP')}
            </div>
          </div>
          <Link href={`/users/${post.user.id}`}>
            <div className="mt-2 flex rounded border p-2">
              {post.user.image && (
                <Image className="block aspect-square size-12 rounded-full object-cover" src='/landscape.png' alt="user icon" width={96} height={96} />
              )}
              <div className="pl-4">
                <p className="text-lg font-semibold">
                  {post.user.name}
                </p>
                <p className="text-sm font-medium whitespace-pre-wrap">
                  {post.user.description}
                </p>
              </div>
            </div>
          </Link>
          <h3 className="mt-2 font-semibold">Caption</h3>
          <p className="whitespace-pre-wrap py-2">{post.caption}</p>
          <h3 className="mt-2 font-semibold">{post.comments.length} Comments</h3>
          <div className="max-h-96 overflow-y-auto">
            {post.comments.map((comment) => (
              <div key={comment.id} className="border-b py-2">
                <div className="mb-1 flex items-center">
                  {comment.user.image && (
                    <Image className="size-6 rounded-full" src='/landscape.png' alt="user icon" width={48} height={48} />
                  )}
                  <div className="ml-1 text-sm font-medium text-gray-800">
                    {comment.user.name}
                  </div>
                  <div className="ml-1 text-sm text-gray-500">
                    {comment.createdAt.toLocaleString('ja-JP')}
                  </div>
                </div>
                <p className="text-sm">{comment.text}</p>
              </div>
            ))}
          </div>
          <form action={CreateCommentWithPostId}>
            <div className="mt-2 flex gap-2">
              <Input name="text" placeholder="add comment" />
              <Button type="submit">Send</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
