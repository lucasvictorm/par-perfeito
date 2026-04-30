import { prisma } from "@/server/db/client";
import bcrypt from "bcryptjs";

export async function login(email: string, senha: string) {
  if (!email || !senha) {
    return { status: 400, error: "Dados inválidos" };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password) {
    return { status: 401, error: "Usuário não encontrado ou login social" };
  }

  const senhaValida = await bcrypt.compare(senha, user.password);

  if (!senhaValida) {
    return { status: 401, error: "Senha incorreta" };
  }

  return { status: 200, success: true };
}
