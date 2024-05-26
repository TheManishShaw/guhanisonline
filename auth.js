// import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import NextAuth from "next-auth";
import axiosInstance from "./lib/axiosInstance";
import CredentialsProvider from "next-auth/providers/credentials";

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },
  authorize: async (credentials) => {
    console.log("we are here============");
    try {
      // Make API call to verify credentials
      const res = await axiosInstance.post(
        "https://guhanapi.ivdata.in/api/auth/login",
        {
          email: credentials.email,
          password: credentials.password,
        }
      );
      console.log("res", res);
      const user = res.data;

      // If no user is returned or the response status is not OK, return null
      if (!user || res.status !== 200) {
        return null;
      }

      // Return user object. It will be saved in the session.
      return user;
    } catch (error) {
      console.error("Login error", error);
      return null;
    }
  },
});

const config = {
  providers: [Google, credentialsConfig],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/dashboard") return !!auth;
      return true;
    },
    async jwt(token, user) {
      // Persist user data (id, name, email) in the token right after signin
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session(session, token) {
      // Send user data to the client
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
  // pages: {
  //   signIn: "/sign-in",
  //   signOut: "/auth/signout",
  //   error: "/auth/error",
  // },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);

// export const {
//   auth,
//   signIn,
//   handlers: { GET, POST },
// } = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       async authorize(credentials) {
//         try {
//           const user = await axiosInstance.post(
//             `/auth/login`,
//             {
//               password: credentials.password,
//               email: credentials.email,
//             },
//             {
//               headers: {
//                 accept: "*/*",
//                 "Content-Type": "application/json",
//               },
//             }
//           );

//           if (user) {
//             return { status: "success", data: user };
//           }
//         } catch (e) {
//           const errorMessage = e.response.data.message;
//           // Redirecting to the login page with error message in the URL
//           throw new Error(errorMessage + "&email=" + credentials.email);
//         }
//       },
//     }),
//   ],
//   secret: process.env.AUTH_SECRET,
//   pages: {
//     signIn: "/sign-in",
//   },
// });
