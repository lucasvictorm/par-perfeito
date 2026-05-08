import { prisma } from "@/server/db/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

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

  return {
    status: 200,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
}

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

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return user;
  } catch {
    return null;
  }
}
