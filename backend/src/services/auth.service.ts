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

  async changePassword() {}
}

export default new Auth();
