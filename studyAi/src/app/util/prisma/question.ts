// /prisma/user.js
import { prismaDb } from "./helpers"
import {
  PrismaTypeMap,
  PrismaTypeMapAsGeneric,
  assertPrismaModel,
} from "@/app/util/prisma/typeGuards";

// UPDATE
export async function updateQuestion<K extends keyof PrismaTypeMap>(
  id: string,
  questionData: object,
  collection: K
): Promise<PrismaTypeMapAsGeneric<K> | null> {
  const col = prismaDb[collection] as any;
  const question = await col.update({
    where: {
      id: id,
    },
    data: questionData
  });
  const docType = assertPrismaModel(collection, question);
  return docType;
}

// DELETE
export async function deleteQuestion<K extends keyof PrismaTypeMap>(
  id: string,
  collection: K
): Promise<PrismaTypeMapAsGeneric<K> | null> {
  const col = prismaDb[collection] as any;
  const question = await col.delete({
    where: {
      id: id,
    },
  });
  const docType = assertPrismaModel(collection, question);
  return docType;
}