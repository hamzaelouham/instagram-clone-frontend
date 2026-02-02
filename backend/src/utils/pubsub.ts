import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub();
(pubsub as any).instanceId = Math.random().toString(36).substr(2, 9);
console.log("PUBSUB Instance created:", (pubsub as any).instanceId);

export const EVENTS = {
    NOTIFICATION_CREATED: "NOTIFICATION_CREATED",
};
