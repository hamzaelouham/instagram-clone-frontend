import { context } from "../utils/types";
import { pubsub, EVENTS } from "../utils/pubsub";

class NotificationService {
    async createNotification(
        { type, recipientId, senderId, postId }: any,
        ctx: context
    ) {
        if (recipientId === senderId) return null; // Don't notify self

        const notification = await ctx.db.notification.create({
            data: {
                type,
                recipientId,
                senderId,
                postId,
            },
            include: {
                sender: true,
                post: true,
            },
        });

        const ps = ctx.pubsub || pubsub;
        console.log(`Publishing notification: ${type} from ${senderId} to ${recipientId} on PubSub: ${(ps as any).instanceId}`);
        ps.publish(EVENTS.NOTIFICATION_CREATED, {
            notificationCreated: notification,
        });

        return notification;
    }

    async getNotifications(ctx: context) {
        const userId = ctx.req?.user?.userId;
        if (!userId) throw new Error("Not authenticated");

        return await ctx.db.notification.findMany({
            where: { recipientId: userId },
            orderBy: { createdAt: "desc" },
            include: {
                sender: true,
                post: true,
            },
        });
    }

    async markAsRead(id: string, ctx: context) {
        return await ctx.db.notification.update({
            where: { id },
            data: { read: true },
        });
    }
}

export default new NotificationService();
