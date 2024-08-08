import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseCookies } from "nookies";

export function middleware(request: NextRequest) {
  const cookies = parseCookies({ req: request });
  const token = cookies.authToken;

  //paths that should be protected
  const protectedPaths = ["/products"];
  const loginPagePath = "/";

  // Check if the requested path is protected and the token is missing
  if (
    protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path)) &&
    !token
  ) {
    // Redirect to the login page if the token is not present
    const url = request.nextUrl.clone();
    url.pathname = loginPagePath;
    return NextResponse.redirect(url);
  }

  // Check if the user is authenticated and trying to access the login page
  if (token && request.nextUrl.pathname === loginPagePath) {
    // Redirect authenticated users away from the login page to the products page
    const url = request.nextUrl.clone();
    url.pathname = "/products";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware to all paths
export const config = {
  matcher: "/:path*",
};
