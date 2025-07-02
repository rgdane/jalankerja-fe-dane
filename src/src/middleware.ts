import type { NextRequest } from "next/server";
import { authMiddleware } from "./middlewares/auth";
import { applyMiddleware } from "./middlewares";

export function middleware(request: NextRequest) {
  //return applyMiddleware(request, [authMiddleware]);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
