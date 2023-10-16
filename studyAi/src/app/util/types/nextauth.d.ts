import NextAuth, { DefaultSession } from "next-auth"
import { User, Session } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            email: string
            password: string
        }
    }
}
