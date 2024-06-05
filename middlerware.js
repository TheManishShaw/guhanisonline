import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Define roles and protected routes
  const protectedRoutes = {
    admin: ["/admin", "/dashboard"],
    user: ["/profile", "/settings"],
  };

  // Check if user is logged in and has the correct role
  if (token) {
    const userRole = token.user.role;

    if (protectedRoutes[userRole]) {
      const isAuthorized = protectedRoutes[userRole].some((route) =>
        pathname.startsWith(route)
      );

      if (isAuthorized) {
        return NextResponse.next();
      }
    }

    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Redirect to login if user is not authenticated
  if (!token && pathname !== "/sign-in") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};
