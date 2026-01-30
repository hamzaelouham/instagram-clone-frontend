// import { NexusGenObjects } from "../graphql/nexus-typegen";
import { context } from "../utils/types";

// : Promise<NexusGenObjects["User"][] | null>
// : Promise<NexusGenObjects["User"] | null>

class User {
  async getUsers(ctx: context) {
    return await ctx.db.user.findMany();
  }
  async getUserById(id: string, ctx: context) {
    return await ctx.db.user.findUnique({
      where: {
        id,
      },
    });
  }
}

export default new User();
