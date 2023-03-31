import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { User } from '../../../schema'
import connect from '@/dbSetup'

connect()

export default NextAuth({
    secret: 'pru-life-uk' || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                if (!credentials?.username) {
                    throw new Error('Username not provided')
                }

                const user = await User.findOne({ username: credentials.username })
                if (!user) {
                    throw new Error('No user found')
                }

                const match = await bcrypt.compare(credentials.password, user.password)

                if (!match) {
                    throw new Error('Incorrect password')
                }

                return user
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, account, user }) => {
            if (user) {
                token.id = user.id
            }
            return token
        },
        session: async ({ session, token }: any) => {
            if (session) {
                session.user.id = token.id
            }

            return session;
          },
    }

})