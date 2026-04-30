import { login } from "@/server/services/auth/login.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, senha } = body;

  const result = await login(email, senha);

  return NextResponse.json(result, { status: result.status });
}
