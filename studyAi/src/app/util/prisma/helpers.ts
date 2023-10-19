import { PrismaClient } from "@prisma/client/edge";
import {
  PrismaTypeMap,
  PrismaTypeMapAsGeneric,
  assertPrismaModel,
} from "@/app/util/prisma/typeGuards";
export const prismaDb = new PrismaClient();
export async function findUniqueByEmail<K extends keyof PrismaTypeMap>(
  email: string,
  collection: K
): Promise<PrismaTypeMapAsGeneric<K> | null> {
  const col = prismaDb[collection] as any;
  const user = col.findUnique({
    where: {
      email: email,
    },
  });
  const docType = assertPrismaModel(collection, user);
  return docType;
}
export async function findUniqueById<K extends keyof PrismaTypeMap>(
  id: string,
  collection: K
): Promise<PrismaTypeMapAsGeneric<K> | null> {
  const col = prismaDb[collection] as any;
  const doc = await col.findUnique({
    where: {
      id: id,
    },
  });
  const docType = assertPrismaModel(collection, doc);
  return docType;
}
