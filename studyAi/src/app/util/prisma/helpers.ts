import { prismaDb } from "./connection";
import {
  PrismaTypeMap,
  PrismaTypeMapAsGeneric,
  assertPrismaModel,
} from "@/app/util/prisma/typeGuards";

export async function findUniqueByEmail<K extends keyof PrismaTypeMap>(
  email: string,
  collection: K
): Promise<PrismaTypeMapAsGeneric<K> | null> {
  const col = prismaDb[collection] as any;
  const user = await col.findUnique({
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
