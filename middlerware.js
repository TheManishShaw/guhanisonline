import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Redirect to sign-in page if the user is not authenticated and tries to access protected routes
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Allow the request if the user is authenticated or the route is not protected
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect all routes that start with /dashboard
};
