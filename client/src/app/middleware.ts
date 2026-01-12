import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;

  if (pathname === "/admin/login") {
    if (token) {
      return NextResponse.redirect(new URL("/admin/menu", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    console.log(token);
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
