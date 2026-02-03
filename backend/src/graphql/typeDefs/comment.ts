import { extendType, nonNull, objectType, stringArg } from 'nexus';
import CommentService from '../../services/comment.service';
import { context } from '../../utils/types';

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.string('id');
    t.string('text');
    t.field('createdAt', {
      type: 'DateTime',
    });
    t.field('updatedAt', {
      type: 'DateTime',
    });
    t.field('author', {
      type: 'User',
      resolve: (parent, _args, ctx: context) => {
        return ctx.db.comment
          .findUnique({
            where: { id: parent.id! },
          })
          .author();
      },
    });
    t.field('post', {
      type: 'Post',
      resolve: (parent, _args, ctx: context) => {
        return ctx.db.comment
          .findUnique({
            where: { id: parent.id! },
          })
          .post();
      },
    });
  },
});

export const commentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addComment', {
      type: 'Comment',
      args: {
        text: nonNull(stringArg()),
        postId: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx: context) => {
        return await CommentService.createComment(args, ctx);
      },
    });
  },
});
