import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUniqueByEmail, findUniqueById } from "@/app/util/prisma/helpers";
import { connectToDb, prismaDb } from "@/app/util/prisma/connection";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { addCredDoc } from "./funcs";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prismaDb),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET as string,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        try {
          // check to see if email and password is there
          if (!credentials?.email || !credentials.password) {
            throw new Error("Please enter an email and password");
          }
          await connectToDb();
          const user = await findUniqueByEmail(
            credentials.email,
            "userCredential"
          );
          //if no user was found
          if (!user || !user?.password) throw new Error("No user found");
          // // check to see if password matches
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          // if password does not match
          if (!passwordMatch) throw new Error("Incorrect password");
          const userId = user.userId;
          const userInfo = await findUniqueById(userId, "user");
          return userInfo;
        } catch (err) {
          console.error(err);
          return null;
        } finally {
          prismaDb.$disconnect();
        }
      },
    }),
  ],
  pages: {
    signIn: "/../../../auth/login/page",
    error: "/../../../auth/login/page",
  },
  callbacks: {
    async session({ session }) {
      try {
        await connectToDb();
        const sessionCreds = await findUniqueByEmail(
          session.user.email,
          "userCredential"
        );
        if (!sessionCreds) return session;
        const sessionUser = await findUniqueById(sessionCreds.userId, "user");
        if (!sessionUser) return session;
        session.user = sessionUser;
        return session;
      } catch (err) {
        console.error(err);
        return session;
      } finally {
        prismaDb.$disconnect();
      }
    },
  },
  events: {
    //create a user document on oauth sign in
    signIn: async ({ profile, account, isNewUser }) => {
      await addCredDoc({ profile, account, isNewUser });
    },
  },
};
