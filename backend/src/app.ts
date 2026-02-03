import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
//@ts-ignore
import { applyMiddleware } from 'graphql-middleware';
import http from 'http';
import cors from 'cors';
import { schema } from './graphql/schema';
import prisma from '../prisma/client';
import { permissions, setAuthUser } from './middleware';
import { verifyToken } from './utils';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { WebSocketServer } from 'ws';
// @ts-ignore
import { useServer } from 'graphql-ws/use/ws';
import { pubsub } from './utils/pubsub';
import { Payload } from './utils/types';
import NotificationService from './services/notification.service';
import { PubSub } from 'graphql-subscriptions';

export async function startApolloServer(port: string | number) {
  dotenv.config();
  const app = express();

  app.use(cors());
  app.use(setAuthUser);

  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const serverCleanup = useServer(
    {
      schema: schema,
      onDisconnect: (ctx: any) => {
        console.log('[WS] onDisconnect');
      },
      onSubscribe: (ctx: any, msg: any) => {
        console.log(
          `[WS] onSubscribe: ${msg.payload.operationName || 'unnamed'}`
        );
      },
      context: (ctx: any) => {
        try {
          const authorization = ctx.connectionParams?.authorization;
          let user = null;
          if (authorization) {
            try {
              const token = (authorization as string)
                .replace('Bearer', '')
                .trim();
              user = verifyToken<Payload>(token);
            } catch (err) {
              console.log('[WS] Context auth error:', err);
            }
          }
          console.log(
            `[WS] context created for ${user?.email || 'anonymous'} (ID: ${user?.userId || 'none'})`
          );
          return { db: prisma, pubsub, user };
        } catch (e) {
          console.error('[WS] CRITICAL Context Error:', e);
          return { db: prisma, pubsub, user: null };
        }
      },
    },
    wsServer
  );

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
    cache: 'bounded',
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
    path: '/graphql',
  });

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(` Server ready at http://localhost:4000${server.graphqlPath}`);
}
