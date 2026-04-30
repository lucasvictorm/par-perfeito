import { register } from "@/server/services/auth/register.service";
import { NextResponse } from "next/server";

import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.email(),
  senha: z.string().min(6),
});

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const { name, email, senha } = parsed.data;

  const result = await register(name, email, senha);
  return NextResponse.json(result, { status: result.status });
}
