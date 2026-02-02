import { context } from "../utils/types";

class Post {
  async createPost(_: any, args: any, ctx: context) {
    const { caption, imageUrl } = args;
    const userId = ctx.req?.user?.userId;
    if (!userId) return null;

    const post = await ctx.db.post.create({
      data: {
        caption,
        imageUrl,
        likesCount: 0,
        author: { connect: { id: userId } },
      },
    });

    return post;
  }

  async deletePost(id: string, ctx: context) {
    try {
      const postToDelete = await ctx.db.post.findUnique({ where: { id } });

      if (postToDelete?.authorId === ctx.req?.user?.userId) {
        return await ctx.db.post.delete({ where: { id: postToDelete?.id } });
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updatePost(_: any, args: any, ctx: context) { }

  async getAllPosts(ctx: context) {
    const posts = await ctx.db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  }

  async getExplorePosts(ctx: context) {
    const userId = ctx.req?.user?.userId;
    return await ctx.db.post.findMany({
      where: {
        authorId: {
          not: userId || undefined,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getPost(id: string, ctx: context) {
    const post = await ctx.db.post.findUnique({
      where: {
        id,
      },
    });

    return post;
  }

  async toggleLikePost(postId: string, ctx: context) {
    const userId = ctx.req?.user?.userId;
    if (!userId) throw new Error("You must be logged in to like a post");

    const existingLike = await ctx.db.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      await ctx.db.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return await ctx.db.post.update({
        where: { id: postId },
        data: { likesCount: { decrement: 1 } },
      });
    } else {
      await ctx.db.like.create({
        data: {
          userId,
          postId,
        },
      });
      return await ctx.db.post.update({
        where: { id: postId },
        data: { likesCount: { increment: 1 } },
      });
    }
  }

  async hasLiked(postId: string, ctx: context) {
    const userId = ctx.req?.user?.userId;
    if (!userId) return false;

    const like = await ctx.db.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    return !!like;
  }

  async postsPagination(args: any, ctx: context) {
    let queryResult = null;

    if (args.after) {
      queryResult = await ctx.db.post.findMany({
        take: args.first,
        skip: 1,
        cursor: {
          id: args.after,
        },
        orderBy: {
          createdAt: "desc"
        }
      });
    } else {
      queryResult = await ctx.db.post.findMany({
        take: args.first,
        orderBy: {
          createdAt: "desc"
        }
      });
    }

    if (queryResult.length > 0) {
      const lastPostInResults = queryResult[queryResult.length - 1];
      const cursor = lastPostInResults.id;
      const secondQueryResult = await ctx.db.post.findMany({
        take: args.first,
        cursor: {
          id: cursor,
        },
        orderBy: {
          createdAt: "desc"
        }
      });
      const result = {
        pageInfo: {
          endCursor: cursor,
          hasNextPage: secondQueryResult.length >= args.first,
        },
        edges: queryResult.map((post: any) => ({
          cursor: post.id,
          node: post,
        })),
      };

      return result;
    }

    return {
      pageInfo: {
        endCursor: null,
        hasNextPage: false,
      },
      edges: [],
    };
  }
}

export default new Post();
