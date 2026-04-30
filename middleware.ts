import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export const config = {
  matcher: ["/dashboard/:path*"],
};
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}
