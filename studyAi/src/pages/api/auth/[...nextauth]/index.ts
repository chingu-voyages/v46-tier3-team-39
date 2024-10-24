import NextAuth from "next-auth";
import { options } from "@/auth/nextAuth/options"
const env = process.env.NODE_ENV;
if (env === "development")
  process.env.NEXTAUTH_URL = process.env.NEXT_AUTH_URL_DEV;
//for prod
else process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL;
export default NextAuth(options);
