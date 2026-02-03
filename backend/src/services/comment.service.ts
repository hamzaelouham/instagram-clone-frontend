import { context } from '../utils/types';
import NotificationService from './notification.service';

class Comment {
  async createComment(args: { text: string; postId: string }, ctx: context) {
    const { text, postId } = args;
    const userId = ctx.req?.user?.userId;

    if (!userId) {
      throw new Error('You must be logged in to comment');
    }

    const comment = await ctx.db.comment.create({
      data: {
        text,
        author: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
      include: {
        author: true,
        post: true,
      },
    });

    // Notify post author
    await NotificationService.createNotification(
      {
        type: 'COMMENT',
        recipientId: comment.post.authorId,
        senderId: userId,
        postId: postId,
      },
      ctx
    );

    return comment;
  }

  async getCommentsByPostId(postId: string, ctx: context) {
    return await ctx.db.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' },
      include: { author: true },
    });
  }
}

export default new Comment();
