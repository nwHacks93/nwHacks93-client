import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyIdToken } from "./lib/db/firebaseAdmin";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value; // Assume the token is stored in cookies

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decodedToken = await verifyIdToken(token);
    if (decodedToken) {
      return NextResponse.next();
    }
  } catch (error) {
    console.error("Error verifying token:", error);
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/app/:path*"]
};
