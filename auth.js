// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// import axiosInstance from "./lib/axios";

import NextAuth from "next-auth";
import axiosInstance from "./lib/axios";
import CredentialsProvider from "next-auth/providers/credentials";
import credentials from "next-auth/providers/credentials";

// const credentialsConfig = CredentialsProvider({
//   name: "Credentials",
//   async authorize(credentials) {
//     try {
//       const user = await axiosInstance.post(
//         `/auth/login`,
//         {
//           password: credentials.password,
//           email: credentials.email,
//         },
//         {
//           headers: {
//             accept: "*/*",
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (user) {
//         return { status: "success", data: user };
//       }
//     } catch (e) {
//       const errorMessage = e.response.data.message;
//       // Redirecting to the login page with error message in the URL
//       throw new Error(errorMessage + "&email=" + credentials.email);
//     }
//   },
// });

// const config = {
//   providers: [Google, credentialsConfig],
//   callbacks: {
//     authorized({ request, auth }) {
//       const { pathname } = request.nextUrl;
//       if (pathname === "/dashboard") return !!auth;
//       return true;
//     },
//   },
//   pages: { SignIn: "/sign-up" },
// };

// export const { handlers, auth, signIn, signOut } = NextAuth(config);

export const {
  auth,
  signIn,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        try {
          const user = await axiosInstance.post(
            `/auth/login`,
            {
              password: credentials.password,
              email: credentials.email,
            },
            {
              headers: {
                accept: "*/*",
                "Content-Type": "application/json",
              },
            }
          );

          if (user) {
            return { status: "success", data: user };
          }
        } catch (e) {
          const errorMessage = e.response.data.message;
          // Redirecting to the login page with error message in the URL
          throw new Error(errorMessage + "&email=" + credentials.email);
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
});
