import {
  PrismaClient,
} from "@prisma/client/edge";
export type IgnorePrismaBuiltins<S extends string> = string extends S
  ? string
  : S extends ""
  ? S
  : S extends `$${infer T}`
  ? never
  : S;
export type PrismaKeys = Exclude<keyof PrismaClient, symbol>;
export type PrismaModelName = IgnorePrismaBuiltins<PrismaKeys>;
