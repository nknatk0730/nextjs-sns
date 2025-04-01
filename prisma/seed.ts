import { Prisma, PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

// const commentData: Prisma.CommentCreateInput[] = [
//   {
//     text: 'Great post!',
//     post: {
//       connect: {
//         id: '1',
//       }
//     },
//     user: {
//       connect: {
//         id: '1',
//       }
//     }
//   }
// ];

export async function main() {
  const userData: Prisma.UserCreateInput[] = [
    {
      name: 'Alice',
      email: 'alice@prisma.io',
      password: await argon2.hash('alicepass123'),
      image: '/images/landscape.png',
      description: 'I am a software engineer',
      posts: {
        create: [
          {
            image: '/images/landscape.png',
            caption: 'A beautiful landscape',
          },
          {
            image: '/images/landscape.png',
            caption: 'A beautiful landscape',
          },
        ],
      },
    },
    {
      name: 'Bob',
      email: 'bob@prisma.io',
      password: await argon2.hash('bobpass456'),
      image: '/images/landscape.png',
      description: 'I am a software engineer',
      posts: {
        create: [
          {
            image: '/images/landscape.png',
            caption: 'A beautiful landscape',
          },
          {
            image: '/images/landscape.png',
            caption: 'A beautiful landscape',
          },
        ],
      },
    }
  ];

  for (const u of userData) {
    await prisma.user.create({ data: u })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  });