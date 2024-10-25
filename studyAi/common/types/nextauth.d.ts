import NextAuth, { DefaultSession } from "next-auth";
import { Session } from "next-auth";
import { User } from "@prisma/client";
declare module "next-auth" {
  interface Session {
    user: User;
  }
}
