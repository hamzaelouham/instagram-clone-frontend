import Auth from "../../services/auth.service";
import User from "../../services/user.service";
import Post from "../../services/post.service";
import { objectType, extendType, idArg, nonNull, stringArg } from "nexus";
import { context } from "../../utils/types";

export const user = objectType({
  name: "User", // <- Name of your type
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("fullname");
    t.string("email");
    t.string("password");
    t.string("image");
    t.field("createdAt", {
      type: "DateTime",
    });
    t.field("updatedAt", {
      type: "DateTime",
    });

    t.list.field("posts", {
      type: "Post",
      resolve: async (parent, _args, ctx: context) =>
        await Post.getAllPosts(ctx),
      // return ctx.db.user
      //   .findUnique({
      //     where: { id: parent.id },
      //   })
      //   .posts();
    });
    t.list.field("followers", {
      type: "User",
      resolve: (parent, _args, ctx) => {
        return ctx.db.user
          .findUnique({
            where: { id: parent.id },
          })
          .followers();
      },
    });
    t.list.field("following", {
      type: "User",
      resolve: (parent, _args, ctx) => {
        return ctx.db.user
          .findUnique({
            where: { id: parent.id },
          })
          .following();
      },
    });
  },
});

export const session = objectType({
  name: "Session", // <- Name of your type
  definition(t) {
    t.string("userId");
    t.string("name");
    t.string("fullname"); // <- Field named `title` of type `String`
    t.string("email"); // <- Field named `email` of type `String`
    t.string("image");
    t.string("accessToken");
  },
});

export const me = objectType({
  name: "Me", // <- Name of your type
  definition(t) {
    t.string("userId");
    t.string("name");
    t.string("fullname"); // <- Field named `title` of type `String`
    t.string("email"); // <- Field named `email` of type `String`
    t.string("image");
  },
});

export const userQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getUsers", {
      type: "User",
      resolve: async (_, __, ctx) => await User.getUsers(ctx),
    }),
      t.field("getUserById", {
        type: "User",
        args: {
          id: nonNull(idArg()),
        },
        resolve: async (_, args, ctx) => await User.getUserById(args.id, ctx),
      }),
      t.list.field("getSuggestions", {
        type: "User",
        resolve: async (_, __, ctx: context) => await User.getSuggestions(ctx),
      }),
      t.field("me", {
        type: "Me",
        resolve: (_, __, ctx) => {
          return ctx.req.user;
        },
      });
  },
});

export const authResponse = objectType({
  name: "AuthResponse",
  definition(t) {
    t.string("message");
  },
});

export const userMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("register", {
      type: "User",

      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        fullname: stringArg(),
        name: stringArg(),
      },
      resolve: async (_, args: any, ctx: context) => {
        return await Auth.register(args, ctx);
      },
    }),
      t.nonNull.field("login", {
        type: "Session",
        args: { email: nonNull(stringArg()), password: nonNull(stringArg()) },
        resolve: async (_, args: any, ctx: context) => {
          return await Auth.login(args, ctx);
        },
      }),
      t.nonNull.field("followUser", {
        type: "User",
        args: {
          userId: nonNull(stringArg()),
        },
        resolve: async (_, args, ctx: context) => {
          return await User.followUser(args.userId, ctx);
        },
      }),
      t.field("requestPasswordReset", {
        type: "AuthResponse",
        args: {
          email: nonNull(stringArg()),
        },
        resolve: async (_, { email }, ctx: context) => {
          return await Auth.requestPasswordReset(email, ctx);
        },
      }),
      t.field("resetPassword", {
        type: "AuthResponse",
        args: {
          token: nonNull(stringArg()),
          password: nonNull(stringArg()),
        },
        resolve: async (_, args, ctx: context) => {
          return await Auth.resetPassword(args, ctx);
        },
      });
  },
});

