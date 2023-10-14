import type {NextAuthOptions} from 'next-auth'
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
                username: {
                    label: 'Username:',
                    type: 'text',
                    placeholder: 'username'
                },
                password: {
                    label: 'Password:',
                    type: "password",
                    placeholder: "password"
                }
            },
            async authorize(credentials) {
                const user = {
                    id: process.env.ADMIN_ID as string,
                    name: process.env.ADMIN_USERNAME as string,
                    password: process.env.ADMIN_PASSWORD as string
                }

                if (credentials?.username === user.name && credentials?.password === user.password) {
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
