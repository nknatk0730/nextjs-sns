import { Prisma, PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();



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

  // const commentData: Prisma.CommentCreateInput[] =[
  //   {
  //     text: 'Great post!',
  //     user: {
  //       connect: {
  //         id: 'cm8yc42jd00001yztqmrkuzvl',
  //       },
  //     },
  //     post: {
  //       connect: {
  //         id: 'cm8yc434h00041yzt6sw60ar0',
  //       },
  //     },
  //   },
  //   {
  //     text: 'wonderful post!',
  //     user: {
  //       connect: {
  //         id: 'cm8yc42jd00001yztqmrkuzvl',
  //       },
  //     },
  //     post: {
  //       connect: {
  //         id: 'cm8yc434h00051yzthuvhyqns',
  //       },
  //     },
  //   },
  //   {
  //     text: 'Great post!',
  //     user: {
  //       connect: {
  //         id: 'cm8yc434h00031yztu4ke6ru0',
  //       },
  //     },
  //     post: {
  //       connect: {
  //         id: 'cm8yc42jd00011yzt8fbcshui',
  //       },
  //     },
  //   },
  //   {
  //     text: 'wonderful post!',
  //     user: {
  //       connect: {
  //         id: 'cm8yc434h00031yztu4ke6ru0',
  //       },
  //     },
  //     post: {
  //       connect: {
  //         id: 'cm8yc42jd00021yzthdacdp5r',
  //       },
  //     },
  //   },
  // ]

  for (const u of userData) {
    await prisma.user.create({ data: u })
  }

  // for (const c of commentData) {
  //   await prisma.comment.create({ data: c })
  // }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  });