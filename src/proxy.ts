import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getSafeRedirectPath } from "@/features/auth/redirect";
import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "@/features/auth/session";

function isProtectedPath(pathname: string): boolean {
  return (
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/posts" ||
    pathname.startsWith("/posts/")
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = verifySessionToken(token);

  if (pathname === "/login") {
    if (session) {
      const redirectPath = getSafeRedirectPath(
        request.nextUrl.searchParams.get("next"),
      );

      return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    return NextResponse.next();
  }

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  if (session) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set(
    "next",
    request.nextUrl.pathname + request.nextUrl.search,
  );

  const response = NextResponse.redirect(loginUrl);

  if (token) {
    response.cookies.delete(SESSION_COOKIE_NAME);
  }

  return response;
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/posts/:path*"],
};
