import { startApolloServer } from "./app";

const port = process.env.PORT || 4000;

startApolloServer(port);

// const typeDefs = gql`
//   type user {
//     id: ID
//     email: String
//     name: String
//   }

//   type Query {
//     getusers: [user]
//   }
// `;

// const resolvers = {
//   Query: {
//     getusers: async () => {
//       return await prisma.user.findMany();
//     },
//   },
// };
