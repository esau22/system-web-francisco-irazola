import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth");
  const { pathname } = request.nextUrl;

  // Check if the user is trying to access any route under /dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!authCookie) {
      // Redirect to login if the auth cookie is not present
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Set a custom header (optional)
  const response = NextResponse.next();
  response.headers.set("custom-header", "custom-value");

  return response;
}
