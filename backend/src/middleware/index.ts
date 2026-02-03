import { rule, shield, allow } from 'graphql-shield';
import { verifyToken } from '../utils';
import { NextFunction, Request, Response } from 'express';
import { Payload } from '../utils/types';

//@ts-ignore
const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  // Check HTTP request user (populated by setAuthUser middleware)
  if (ctx.req?.user) return true;

  // Check GraphQL context user (populated by useServer context for WS)
  if (ctx.user) return true;

  // Fallback check for headers if user object not attached yet
  if (ctx.req) {
    const { authorization } = ctx.req.headers;
    if (!authorization) return false;
    const token = authorization.replace('Bearer', '').trim();
    const payload = verifyToken<Payload>(token);
    return !!payload?.userId;
  }

  return false;
});

export const permissions = shield(
  {
    Query: {
      getUsers: isAuthenticated,
      getNotifications: isAuthenticated,
    },
    Mutation: {
      markNotificationAsRead: isAuthenticated,
    },
    Subscription: {
      notificationCreated: allow,
    },
  },
  {
    allowExternalErrors: true,
  }
);

export function setAuthUser(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers['authorization'];
  if (authorization) {
    try {
      const token = authorization.replace('Bearer', '').trim();
      const payload = verifyToken<Payload>(token);
      //@ts-ignore
      req.user = payload;
    } catch (err) {
      console.log('Auth error:', err);
    }
  }

  return next();
}
