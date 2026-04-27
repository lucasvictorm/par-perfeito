import { prisma } from "../db/client";

export async function checkDatabase() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      status: "online",
    };
  } catch (error) {
    return {
      status: "offline",
    };
  }
}
