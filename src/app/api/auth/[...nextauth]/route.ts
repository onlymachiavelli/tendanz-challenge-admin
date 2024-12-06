import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { login } from "@/lib/api/admin"
import axios from "axios"

const nextOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "email", placeholder: "Enter Email" },
        password: { label: "password", placeholder: "Enter Pass" },
      },
      async authorize(creds: any) {
        try {
          const res = await login({
            email: creds.identifier,
            password: creds.password,
          })
          if (res.data && res.status === 200) {
            const { token, admin } = res.data

            return {
              ...admin,
              token,
            }
          }

          return null
        } catch (e) {
          console.error("Authorization error:", e)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
  },
  callbacks: {
    session: async ({ session, token }: any) => {
      session.user = {
        id: token.id,
        firstName: token.firstName,
        lastName: token.lastName,
        email: token.email,
        phone: token.phone,
        verified: token.verified,
      }
      session.token = token.token
      return Promise.resolve(session)
    },
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.id = user.id
        token.firstName = user.first_name
        token.lastName = user.last_name
        token.email = user.email
        token.phone = user.phone
        token.verified = user.verified
        token.token = user.token
      }
      return Promise.resolve(token)
    },
  },
  secret: process.env.TOKEN_SECRET as string,

  debug: true,
}

const handler = NextAuth(nextOptions)
export { handler as GET, handler as POST }
