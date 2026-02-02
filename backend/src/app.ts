import { ApolloServer } from "apollo-server-express";
import express from "express";
import dotenv from "dotenv";
//@ts-ignore
import { applyMiddleware } from "graphql-middleware";
import http from "http";
import cors from "cors";
import { schema } from "./graphql/schema";
import prisma from "../prisma/client";
import { permissions, setAuthUser } from "./middleware";
import { verifyToken } from "./utils";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { WebSocketServer } from "ws";
// @ts-ignore
import { useServer } from "graphql-ws/use/ws";
import { pubsub } from "./utils/pubsub";
import { Payload } from "./utils/types";
import NotificationService from "./services/notification.service";
import { PubSub } from "graphql-subscriptions";

export async function startApolloServer(port: string | number) {
  dotenv.config();
  const app = express();

  app.use(cors());
  app.use(setAuthUser);

  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const serverCleanup = useServer({
    schema: applyMiddleware(schema, permissions),
    context: (ctx: any) => {
      const authorization = ctx.connectionParams?.authorization;
      let user = null;
      if (authorization) {
        try {
          const token = (authorization as string).replace("Bearer", "").trim();
          user = verifyToken<Payload>(token);
          console.log("WS Connected. User:", user?.email);
        } catch (err) {
          console.log("WS Auth error:", err);
        }
      } else {
        console.log("WS Connected. No auth token.");
      }
      return { db: prisma, pubsub, user };
    }
  }, wsServer);

  const server = new ApolloServer({
    schema: applyMiddleware(schema, permissions),
    context: ({ req, res }) => {
      return {
        req,
        res,
        db: prisma,
        pubsub,
      };
    },
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start();
  server.applyMiddleware({
    app: app as any,
    path: "/graphql",
  });

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(` Server ready at http://localhost:4000${server.graphqlPath}`);

  // DEBUG: Trigger a notification every 60 seconds to a known user (Mike)
  setInterval(async () => {
    console.log("DEBUG: Auto-generating test notification for Mike...");
    const mikeId = "cml2s09bt0001uxytygnoh8z7";
    const senderId = "cml2s09800000uxyt7o88f39a"; // Sarah/Seed

    NotificationService.createNotification({
      type: "LIKE",
      recipientId: mikeId,
      senderId: senderId,
    }, { db: prisma, pubsub } as any).catch((err: any) => console.error("DEBUG Notification error:", err));
  }, 60000);
}
