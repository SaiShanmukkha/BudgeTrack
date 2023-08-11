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
    maxAge: 1 * 60 * 60,
  },
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: '/auth/login',
  },
  jwt: {
    encryption: true,
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      token.isNewUser = isNewUser;
      if(account){
        if(account.type === "credentials"){
          if(user){
            token.userId = user.id;
            token.emailVerified = user.emailVerified;
          }
        }else if(account.type === "oauth"){
          if(user){
            token.userId = user.id;
          }
          if(profile){
            token.emailVerified = profile.email_verified;
          }
        }
      }
      return token;
    },
    async session({ session, user, token }) {
      session.user.userId = token.userId;
      session.user.emailVerified = token.emailVerified;
      return session;
    },
  }
}

const handler = NextAuth(authOptions)
export default handler;