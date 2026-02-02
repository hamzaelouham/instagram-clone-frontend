import { objectType, extendType, subscriptionField, nonNull, stringArg, enumType } from "nexus";
import { withFilter } from "graphql-subscriptions";
import NotificationService from "../../services/notification.service";
import { EVENTS } from "../../utils/pubsub";

export const notificationTypeEnum = enumType({
    name: "NotificationType",
    members: ["FOLLOW", "LIKE", "COMMENT"],
});

export const notification = objectType({
    name: "Notification",
    definition(t) {
        t.string("id");
        t.field("type", { type: "NotificationType" });
        t.boolean("read");
        t.field("createdAt", { type: "DateTime" });
        t.field("sender", { type: "User" });
        t.field("recipient", { type: "User" });
        t.field("post", { type: "Post" });
    },
});

export const notificationQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getNotifications", {
            type: "Notification",
            resolve: async (_, __, ctx) => await NotificationService.getNotifications(ctx),
        });
    },
});

export const notificationMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("markNotificationAsRead", {
            type: "Notification",
            args: {
                id: nonNull(stringArg()),
            },
            resolve: async (_, { id }, ctx) => await NotificationService.markAsRead(id, ctx),
        });
        t.field("testNotification", {
            type: "Notification",
            args: {
                recipientId: nonNull(stringArg()),
            },
            resolve: async (_, { recipientId }, ctx) => {
                const userId = ctx.req?.user?.userId;
                return await NotificationService.createNotification({
                    type: "LIKE",
                    recipientId,
                    senderId: userId || "system",
                }, ctx);
            }
        });
    },
});

export const notificationSubscription = subscriptionField("notificationCreated", {
    type: "Notification",
    subscribe: withFilter(
        (_, __, { pubsub, user }: any) => {
            console.log("Subscribing to notificationCreated. User:", user?.email);
            return pubsub.asyncIterator(EVENTS.NOTIFICATION_CREATED);
        },
        (payload, _, { user }: any) => {
            const match = payload.notificationCreated.recipientId === user?.userId;
            console.log(`Filtering notification. Recipient: ${payload.notificationCreated.recipientId}, CurrentUser: ${user?.userId}, Match: ${match}`);
            return match;
        }
    ) as any,
    resolve: (payload: any) => {
        console.log("Resolving notificationCreated payload:", payload.notificationCreated.id);
        return payload.notificationCreated;
    },
});
