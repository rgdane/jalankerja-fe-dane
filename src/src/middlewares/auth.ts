import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/dashboard", "/dashboard/squad"];

export function authMiddleware(
  req: NextRequest,
  res: NextResponse | null = null,
  next: () => NextResponse
) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isProtected = protectedPaths.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  const isLoginPage = pathname === "/auth/login";

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return next();
}
