import prisma from "./prisma";

export const fetchDashboard = async () => {
  const email = 'alice@prisma.io';

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {email},
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
        posts: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    throw new Error('Failed to fetch dashboard data');
  }
}

export const fetchLatestPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        image: true,
        caption: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts;
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    throw new Error('Failed to fetch latest posts');
  }
}

export const fetchPost = async (id: string) => {
  try {
    const post = await prisma.post.findFirstOrThrow({
      where: {id},
      select: {
        id: true,
        image: true,
        caption: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            description: true,
            image: true,
          },
        },
      },
    });

    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw new Error('Failed to fetch post data');
  }
}

export const fetchPostWithComments = async (id: string) => {
  try {
    const post = await prisma.post.findFirstOrThrow({
      where: {id},
      select: {
        id: true,
        image: true,
        caption: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            description: true,
            image: true,
          },
        },
        comments: {
          select: {
            id: true,
            text: true,
            createdAt: true,
            user: {
              select: {
                name: true,
                image: true,
                description: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return post;
  } catch (error) {
    console.error('Error fetching post with comments:', error);
    throw new Error('Failed to fetch post with comments');
  }
}

export const fetchLatestUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });

    return users;
  } catch (error) {
    console.error('Error fetching latest users:', error);
    throw new Error('Failed to fetch latest users');
  }
}

export const fetchUser = async (id: string) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
        posts: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      }
    });

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user data');
  }
}

export const fetchMe = async () => {}