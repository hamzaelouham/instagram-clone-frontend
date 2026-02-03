import { PrismaClient } from '../src/generated/client';

// add prisma to the NodeJS global type
// TODO : downgraded @types/node to 15.14.1 to avoid error on NodeJS.Global
// interface CustomNodeJsGlobal extends NodeJS.Global {
//   prisma: PrismaClient;
// }

// Prevent multiple instances of Prisma Client in development
// declare const global: CustomNodeJsGlobal;

// const prisma = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV === "development") {
//   global.prisma = prisma;
// }
// const prisma = new PrismaClient();

const prisma = new PrismaClient({
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

prisma.$on('warn', (e: any) => {
  console.log(e);
});

prisma.$on('info', (e: any) => {
  console.log(e);
});

prisma.$on('error', (e: any) => {
  console.log(e);
});

export default prisma;
