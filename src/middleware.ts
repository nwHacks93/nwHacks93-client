import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken");

  if (!token) {
    // Redirect to login if token is missing
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access if token exists
  return NextResponse.next();
}

export const config = {
  matcher: ["/user-app/:path*"]
};
