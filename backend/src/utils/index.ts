import * as bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";

export const Hash = async (password: string, salt: number) => {
  return await bcrypt.hash(password, salt);
};

export const Compare = async (password: string, hashPassword: string) => {
  return await bcrypt.compare(password, hashPassword);
};

export function createToken(payload: string | Buffer | object) {
  return sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
}

export function verifyToken<T>(token: string): T | null {
  try {
    const data = verify(token, process.env.JWT_SECRET!) as T;
    return data;
  } catch (e) {
    return null;
  }
}
