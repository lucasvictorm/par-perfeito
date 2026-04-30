import { describe, it, expect, vi, beforeEach } from "vitest";
import bcrypt from "bcryptjs";
import { login } from "@/server/services/auth/login.service";
import { prisma } from "@/server/db/client";

vi.mock("@/server/db/client", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

describe("login service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar 400 se dados inválidos", async () => {
    const result = await login("", "");

    expect(result.status).toBe(400);
  });

  it("deve retornar 401 se usuário não existir", async () => {
    (prisma.user.findUnique as any).mockResolvedValue(null);

    const result = await login("teste@email.com", "123");

    expect(result.status).toBe(401);
  });

  it("deve retornar 401 se senha estiver errada", async () => {
    (prisma.user.findUnique as any).mockResolvedValue({
      email: "teste@email.com",
      password: "hash_falso",
    });

    vi.spyOn(bcrypt, "compare").mockResolvedValue(false as never);

    const result = await login("teste@email.com", "errada");

    expect(result.status).toBe(401);
  });

  it("deve retornar sucesso no login correto", async () => {
    (prisma.user.findUnique as any).mockResolvedValue({
      email: "teste@email.com",
      password: "hash_valido",
    });

    vi.spyOn(bcrypt, "compare").mockResolvedValue(true as never);

    const result = await login("teste@email.com", "123456");

    expect(result.status).toBe(200);
    expect(result.user).toBe({});
  });
});
