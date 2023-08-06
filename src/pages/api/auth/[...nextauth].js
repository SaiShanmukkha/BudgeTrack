import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Googleprovider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "../../../components/Utilities/prismadb"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcrypt"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Googleprovider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials:{
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password", placeholder: "password" },
        username: { label: "Username", type: "text", placeholder: "User Name"}
      },

      async authorize(credentials){
          // check to see if email and password is there
          if(!credentials.email || !credentials.password) {
            throw new Error('Please enter an email and password')
        }

        // check to see if user exists
        const user = await prisma.user.findUnique({
            where: {
                email: credentials.email
            }
        });

        // if no user was found 
        if (!user || !user?.hashedPassword) {
            throw new Error('No user found')
        }

        // check to see if password matches
        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

        // if password does not match
        if (!passwordMatch) {
            throw new Error('Incorrect password')
        }

        return user;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session:{
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: '/auth/login',
  },
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     return true
  //   },
  //   async redirect({ url, baseUrl }) {
  //     return baseUrl
  //   },
  //   async session({ session, user, token }) {
  //     return session
  //   },
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     return token
  //   },
  // }
}

const handler = NextAuth(authOptions)
export default handler;