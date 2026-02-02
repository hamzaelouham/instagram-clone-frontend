// import { NexusGenObjects } from "../graphql/nexus-typegen";
import { context } from "../utils/types";

// : Promise<NexusGenObjects["User"][] | null>
// : Promise<NexusGenObjects["User"] | null>

import NotificationService from "./notification.service";

class User {
  async getUsers(ctx: context) {
    return await ctx.db.user.findMany();
  }
  async getUserById(id: string, ctx: context) {
    return await ctx.db.user.findUnique({
      where: {
        id,
      },
    });
  }
  async getSuggestions(ctx: context) {
    if (!ctx.req.user) {
      throw new Error("Log in to get suggestions");
    }

    // Get users you are NOT following and NOT yourself
    const following = await ctx.db.user
      .findUnique({ where: { id: ctx.req.user.userId } })
      .following();

    const followingIds = following?.map((u) => u.id) || [];
    followingIds.push(ctx.req.user.userId);

    return await ctx.db.user.findMany({
      where: {
        id: {
          notIn: followingIds,
        },
      },
      take: 5,
    });
  }

  async followUser(userIdToFollow: string, ctx: context) {
    const userId = ctx.req?.user?.userId;
    console.log(`followUser called. From: ${userId}, To: ${userIdToFollow}`);
    if (!ctx.req.user) {
      throw new Error("Log in to follow users");
    }

    const updatedUser = await ctx.db.user.update({
      where: { id: ctx.req.user.userId },
      data: {
        following: {
          connect: { id: userIdToFollow },
        },
      },
    });

    // Notify the user being followed
    await NotificationService.createNotification(
      {
        type: "FOLLOW",
        recipientId: userIdToFollow,
        senderId: ctx.req.user.userId,
      },
      ctx
    );

    return updatedUser;
  }
}

export default new User();
