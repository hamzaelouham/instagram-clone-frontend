import { context } from "../utils/types";

class Comment {
    async createComment(args: { text: string; postId: string }, ctx: context) {
        const { text, postId } = args;
        const userId = ctx.req?.user?.userId;

        if (!userId) {
            throw new Error("You must be logged in to comment");
        }

        return await ctx.db.comment.create({
            data: {
                text,
                author: { connect: { id: userId } },
                post: { connect: { id: postId } },
            },
            include: {
                author: true,
            },
        });
    }

    async getCommentsByPostId(postId: string, ctx: context) {
        return await ctx.db.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "desc" },
            include: { author: true },
        });
    }
}

export default new Comment();
