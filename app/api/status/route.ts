import { checkDatabase } from "@/server/services/status";

export async function GET() {
  const database = await checkDatabase();
  return Response.json({
    status: "ok",
    database: database.status,
    timestamp: new Date().toISOString(),
  });
}
