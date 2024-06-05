import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import axios from "axios";
import { addSeconds } from "date-fns";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            "https://guhanapi.ivdata.in/api/auth/login",
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          const loginData = response.data;

          if (!loginData || response.status !== 200) {
            return null;
          }

          const accessToken = loginData.access_token;

          const userResponse = await axios.get(
            "https://guhanapi.ivdata.in/api/users/me",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const user = userResponse.data;

          return {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            phone: user.phone,
            role: user.role,
            accessToken: accessToken,
            accessTokenExpires: addSeconds(new Date(), loginData.expires_in),
          };
        } catch (error) {
          console.error("Login or user details fetch error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          accessToken: user.accessToken,
          accessTokenExpires: user.accessTokenExpires,
        };
      }

      if (new Date(token.user.accessTokenExpires) < new Date()) {
        return {};
      }

      return token;
    },
    async session({ session, token }) {
      if (!token.user || new Date(token.user.accessTokenExpires) < new Date()) {
        return null;
      }

      if (token.user) {
        session.user = {
          id: token.user.id,
          name: token.user.name,
          email: token.user.email,
          phone: token.user.phone,
          role: token.user.role,
        };
        session.accessToken = token.user.accessToken;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    jwt: true,
  },
});
