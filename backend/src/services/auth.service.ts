import { Compare, Hash, createToken } from "../utils";
import { context } from "../utils/types";

class Auth {
  async login(args: any, ctx: context) {
    const user = await ctx.db.user.findUnique({
      where: { email: args.email },
    });

    if (!user) {
      throw new Error("No such user found");
    }
    const isValid = await Compare(args.password, user.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    const accessToken = createToken({
      userId: user.id,
      email: user.email,
    });

    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      accessToken,
    };
  }
  async register({ email, password, fullname, name }: any, ctx: context) {
    let user = await ctx.db.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new Error("email must be unique !, email already taken!");
    }

    user = await ctx.db.user.create({
      data: {
        email: email,
        name: name,
        fullname: fullname,
        password: await Hash(password, 10),
      },
    });

    if (!user) {
      throw new Error("ops!, you are not registerd !");
    }

    return user;
  }

  async changePassword() { }

  async requestPasswordReset(email: string, ctx: context) {
    const user = await ctx.db.user.findUnique({ where: { email } });
    if (!user) {
      // For security, don't reveal if user exists, but here we can throw or just return success
      return { message: "If an account with that email exists, we have sent a reset link." };
    }

    const crypto = require("crypto");
    const token = crypto.randomBytes(20).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour

    await ctx.db.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: expires,
      },
    });

    // MOCK EMAIL SENDING
    console.log(`[PASS_RESET] Token for ${email}: ${token}`);

    return { message: "If an account with that email exists, we have sent a reset link." };
  }

  async resetPassword({ token, password }: any, ctx: context) {
    const user = await ctx.db.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new Error("Password reset token is invalid or has expired.");
    }

    await ctx.db.user.update({
      where: { id: user.id },
      data: {
        password: await Hash(password, 10),
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return { message: "Success! Your password has been changed." };
  }
}

export default new Auth();
