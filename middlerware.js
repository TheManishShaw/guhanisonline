import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const userRole = token.user?.role || "user";
  console.log("token===>", token);
  console.log("userRole =====>", userRole);

  const userRoutes = ["/dashboard", "/dashboard/profile", "/dashboard/orders"];
  const adminRoutes = [
    "/dashboard",
    "/dashboard/profile",
    "/dashboard/orders",
    "/dashboard/admin",
  ];

  if (userRole === "user" && !userRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (userRole === "admin" && !adminRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
