import { login } from "@/server/services/auth/login.service";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, senha } = body;

  const result = await login(email, senha);

  if ("error" in result) {
    return NextResponse.json(result, { status: result.status });
  }

  const token = jwt.sign({ userId: result.user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  const response = NextResponse.json({ success: true }, { status: 200 });

  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
  });

  return response;
}
