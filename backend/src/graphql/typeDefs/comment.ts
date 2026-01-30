import { objectType } from "nexus";

export const Comment = objectType({
  name: "Comment",
  definition(t) {
    t.string("id");
    t.string("text");
    t.field("createdAt", {
      type: "DateTime",
    });
    t.field("updatedAt", {
      type: "DateTime",
    });
    t.field("author", {
      type: "User",
      resolve: (parent, _args, ctx) => {
        return ctx.prisma.comment
          .findUnique({
            where: { id: parent.id },
          })
          .author();
      },
    });
    t.field("post", {
      type: "Post",
      resolve: (parent, _args, ctx) => {
        return ctx.prisma.comment
          .findUnique({
            where: { id: parent.id },
          })
          .post();
      },
    });
  },
});
