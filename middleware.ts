import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isApi = pathname.startsWith("/api/");
  if (isApi) return NextResponse.next();
  if (pathname === "/login" || pathname.startsWith("/_next") || pathname.startsWith("/public")) return NextResponse.next();
  const cookie = req.cookies.get("bw_auth");
  if (!cookie || cookie.value !== "1") {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/applications/:path*", "/dashboard/:path*" ,"/"],
};
