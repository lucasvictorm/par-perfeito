import { checkDatabase } from "../server/services/status";

import { describe, it, expect } from "vitest";

describe("status service", () => {
  it("banco online", async () => {
    const result = await checkDatabase();

    expect(result).toBeDefined();
  });
});
