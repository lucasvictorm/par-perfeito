import "dotenv/config";
import { checkDatabase } from "../server/services/status";

async function run() {
  try {
    await checkDatabase();
    console.log("DB OK");
  } catch (e) {
    console.error("DB FAIL", e);
  }
}

run();
