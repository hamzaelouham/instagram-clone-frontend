import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

export interface Payload {
  userId: string;
  email: string;
}

export interface AuthRequest extends Request {
  user: Payload | null;
}

export interface context {
  req: AuthRequest;
  res: Response;
  db: PrismaClient;
}
