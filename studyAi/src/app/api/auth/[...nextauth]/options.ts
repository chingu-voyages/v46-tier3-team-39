import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  connectToDb,
  findUniqueByEmail,
  findUniqueById,
  prismaDb,
} from "@/app/util/prisma/helpers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prismaDb),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXT_AUTH_SECRET as string,
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
            "userCredentials"
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
    newUser: "/../../../auth/signup/page",
  },
  callbacks: {
    async session({ session }) {
      try {
        await connectToDb();
        const sessionCreds = await findUniqueByEmail(
          session.user.email,
          "userCredentials"
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
    //create a user document on oauth sign in
    async signIn({ profile, account }) {
      if (!profile) return true;
      //for Oauth provider mapping to db
      try {
        const { email, name } = profile;
        if (!email || !name) return false;
        await connectToDb();
        const [user, userDoc] = await Promise.all([
          findUniqueByEmail(email, "userCredentials"),
          findUniqueByEmail(email, "user"),
        ]);
        if (account && account.userId && !user)
          await prismaDb.userCredentials.create({
            data: {
              userId: account.userId,
              email,
              provider: "oauth",
            },
          });
        //this only occurs when oauth is typically used,
        //since sign with email and pw already
        //has the cred file created
        if (userDoc && !user)
          await prismaDb.userCredentials.create({
            data: {
              userId: userDoc.id,
              email,
              provider: "oauth",
            },
          });
        return true;
      } catch (err) {
        console.error(err);
        return false;
      } finally {
        prismaDb.$disconnect();
      }
    },
  },
};
