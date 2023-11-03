import { PrismaClient } from "@prisma/client";
export const prismaDb = new PrismaClient();
export const connectToDb = async () => {
  try {
    await prismaDb.$connect();
  } catch (e) {
    throw new Error("Unable to connect to database");
  }
};
