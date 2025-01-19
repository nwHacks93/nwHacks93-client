import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow access if token exists
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"]
};
