import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email:',
                    type: 'text',
                    placeholder: 'email'
                },
                password: {
                    label: 'Password:',
                    type: "password",
                    placeholder: "password"
                }
            },
            async authorize(credentials) {
                const user = {
                    id: "1",
                    email: "admin@studyai.com",
                    password: "studyai"
                }

                if (credentials?.email === user.email && credentials?.password === user.password) {
                    console.log(user.email, user.password)
                    return user
                } else {
                    return null
                }
            },
        }),
    ],
    pages: {
        signIn: '/../../../auth/login/page',
        newUser: '/../../../auth/signup/page',
    }
}
