import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, senha } = body;

  if (!email || !senha) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  if (email !== "teste@gmail.com" || senha !== "testesenha") {
    return NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 },
    );
  }

  return NextResponse.json({ success: true });
}
