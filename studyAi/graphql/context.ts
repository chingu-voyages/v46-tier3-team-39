import { PrismaClient } from "@prisma/client";

export const prismaDb = new PrismaClient();
export const connectToDb = async () => {
  try {
    await prismaDb.$connect();
  } catch (e) {
    throw new Error("Unable to connect to database");
  }
};

export type Context = {
  prismaDb: PrismaClient
};

export async function createContext(): Promise<Context> {
  await Promise.all([connectToDb()])
  return {
    prismaDb
  };
}