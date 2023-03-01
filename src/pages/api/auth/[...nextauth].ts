import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from './lib/mongodb'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        Auth0Provider({
          clientId: process.env.NEXT_PUBLIC_AUTH0_ID || '',
          clientSecret: process.env.NEXT_PUBLIC_AUTH0_SECRET || '',
          issuer: process.env.NEXT_PUBLIC_AUTH0_ISSUER
        }),
        GoogleProvider({
          clientId: process.env.NEXT_PUBLIC_GOOGLE_ID || '',
          clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET || ''
        }),
        GitHubProvider({
          clientId: process.env.NEXT_PUBLIC_GIHUB_ID || '',
          clientSecret: process.env.NEXT_PUBLIC_GIHUB_SECRET || ''
        }),
        FacebookProvider({
          clientId: process.env.FACEBOOK_CLIENT_ID || '',
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET || ''
        })
    ],
    pages: {
      signIn: "/signin"
    },
    session: {
      strategy: "jwt"
    },
    secret: process.env.NEXT_PUBLIC_JWT_SECRET

  })
}
