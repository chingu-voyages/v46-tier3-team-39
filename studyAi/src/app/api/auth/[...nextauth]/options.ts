import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  findUniqueByEmail,
  findUniqueById,
  prismaDb,
} from "@/app/util/prisma/helpers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import axios from "axios";
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
      async authorize(credentials) {
        // check to see if email and password is there
        if (!credentials?.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }
        const user = await findUniqueByEmail(
          credentials.email,
          "userCredentials"
        );
        // if no user was found
        if (!user || !user?.password) {
          throw new Error("No user found");
        }
        // check to see if password matches
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        // if password does not match
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }
        const userId = user.id;
        return await findUniqueById(userId, "user");
      },
    }),
  ],
  pages: {
    signIn: "/../../../auth/login/page",
    newUser: "/../../../auth/signup/page",
  },
  callbacks: {
    async session({ session }) {
      const sessionCreds = await findUniqueByEmail(
        session.user.email,
        "userCredentials"
      );
      if (!sessionCreds) return session;
      const sessionUser = await findUniqueById(sessionCreds.userId, "user");
      if (!sessionUser) return session;
      session.user = sessionUser;
      return session;
    },
    //create a user document on oauth sign in
    async signIn({ profile }) {
      if (!profile) return true;
      //for Oauth provider mapping to db
      try {
        const { email, name } = profile;
        if (!email || !name) return false;
        const user = await findUniqueByEmail(email, "userCredentials");
        //user data and account exists in our db, so we can sign in
        if (user) return true;
        const req = await axios({
          url: "/api/user",
          method: "POST",
          data: {
            email,
            name,
            provider: "oauth",
            password: null,
          },
        });
        if (req.status !== 201) {
          throw Error(req.data);
        }
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
};
