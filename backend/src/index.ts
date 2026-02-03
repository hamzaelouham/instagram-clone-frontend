import { startApolloServer } from './app';
import * as fs from 'fs';
import * as path from 'path';

import * as util from 'util';

const logPath = path.join(process.cwd(), 'server.log');
fs.writeFileSync(logPath, `Server starting at ${new Date().toISOString()}\n`);

const originalLog = console.log;
console.log = (...args) => {
  const formatted = args
    .map((arg) =>
      typeof arg === 'object' ? util.inspect(arg, { depth: null }) : arg
    )
    .join(' ');
  fs.appendFileSync(logPath, formatted + '\n');
  originalLog(...args);
};

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
