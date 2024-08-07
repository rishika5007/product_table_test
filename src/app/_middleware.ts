// // app/middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("authToken");

//   // If no token is found and user is trying to access a protected route, redirect to login
//   if (!token && request.nextUrl.pathname.startsWith("/products")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/products/**"], // Match protected routes
// };
