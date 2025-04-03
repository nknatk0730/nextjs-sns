import { fetchUser } from '@/lib/apis';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await fetchUser(id);

  return (
    <div className='mx-auto max-w-5xl'>
      <div className='mt-8 flex p-4'>
        {user.image && (
          <Image className="block aspect-[1/1] rounded-full object-cover" src='/landscape.png' alt="user icon" width={96} height={96} />
        )}
        {!!user.image || (
          <Image className="block aspect-[1/1] rounded-full object-cover" src='/landscape.png' alt="user icon" width={96} height={96} />
        )}
        <div className='pl-4'>
          <p className='text-lg font-semibold'>{user.name}</p>
          <p className='whitespace-pre-wrap font-medium'>{user.description}</p>
          <div className='mt-4 flex'>
            <p className='text-sm font-semibold'>{user.posts.length} Post</p>
          </div>
        </div>
      </div>
      <div className='my-8 bg-gray-50'>
        <div className='grid grid-cols-3 gap-1'>
          {user.posts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <Image className="aspect-[1/1] w-full object-cover" src='/landscape.png' alt="user icon" width={96} height={96} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
