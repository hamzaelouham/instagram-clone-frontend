import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./typeDefs/";

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, "../graphql", "nexus-typegen.ts"), // 2
    schema: join(__dirname, "../graphql", "schema.graphql"), // 3
  },
});
