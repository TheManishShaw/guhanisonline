import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { addSeconds } from "date-fns";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
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
            console.error("Invalid login response:", response);
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
          if (error.response) {
            console.error("Login error response:", error.response.data);
          } else {
            console.error("Login error:", error);
          }
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

      if (
        token.user &&
        token.user.accessTokenExpires &&
        new Date(token.user.accessTokenExpires) < new Date()
      ) {
        return {};
      }

      return token;
    },
    async session({ session, token }) {
      if (
        !token.user ||
        !token.user.accessTokenExpires ||
        new Date(token.user.accessTokenExpires) < new Date()
      ) {
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
      const urlObject = new URL(url);
      const callbackUrl = urlObject.searchParams.get("callbackUrl");

      if (callbackUrl) {
        return callbackUrl;
      }

      return baseUrl;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    jwt: true,
  },
});
