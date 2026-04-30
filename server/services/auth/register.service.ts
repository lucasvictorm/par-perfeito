import { prisma } from "@/server/db/client";
import bcrypt from "bcryptjs";

export async function register(name: string, email: string, senha: string) {
  try {
    if (!name || !email || !senha) {
      return { status: 40, error: "Todos os campos são obrigatórios" };
    }

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return { status: 400, error: "O usuário já existe" };
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: senhaHash,
        provider: "credentials",
      },
    });

    return {
      status: 201,
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  } catch (error) {
    console.log(error);
    return { status: 500, error: "Erro interno" };
  }
}
