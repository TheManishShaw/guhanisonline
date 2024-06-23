import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname, origin, search } = req.nextUrl;
  console.log(`Middleware triggered for path: ${pathname}`);

  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log(`Token: ${token ? "Found" : "Not Found"}`);

    // Define roles and protected routes
    const protectedRoutes = {
      admin: ["/admin", "/dashboard"],
      user: ["/dashboard/profile", "/dashboard/orders"],
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

        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Redirect to login if user is not authenticated
    if (!token && pathname !== "/sign-in") {
      const signInUrl = new URL("/sign-in", origin);
      signInUrl.searchParams.set(
        "callbackUrl",
        `${origin}${pathname}${search}`
      );
      console.log(`Redirecting to: ${signInUrl}`);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error(`Middleware error: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};
