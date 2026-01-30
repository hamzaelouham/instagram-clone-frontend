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
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";

export async function startApolloServer(port: string | number) {
  dotenv.config();
  const app = express();

  app.use(cors());
  app.use(setAuthUser);

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema: applyMiddleware(schema, permissions),
    context: ({ req, res }) => ({
      req,
      res,
      db: prisma,
    }),
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(` Server ready at http://localhost:4000${server.graphqlPath}`);
}
