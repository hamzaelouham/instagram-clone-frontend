import { rule, shield } from "graphql-shield";
import { verifyToken } from "../utils";
import { NextFunction, Request, Response } from "express";
import { Payload } from "../utils/types";

//@ts-ignore
const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  const { authorization } = ctx.req.headers;
  if (!authorization) {
    return false;
  }
  const token = authorization.replace("Bearer", "").trim();
  const payload = verifyToken<Payload>(token);

  return !!payload?.userId;
});

export const permissions = shield({
  Query: {
    getUsers: isAuthenticated,
  },
  Mutation: {},
});

export function setAuthUser(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers["authorization"];
  if (authorization) {
    try {
      const token = authorization.replace("Bearer", "").trim();
      const payload = verifyToken<Payload>(token);
      //@ts-ignore
      req.user = payload;
    } catch (err) {
      console.log(err);
    }
  }

  return next();
}
