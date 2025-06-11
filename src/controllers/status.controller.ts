import { statusStore } from "@/stores/status.store";
import type { Context } from "hono";
import z from "zod";

export const statusController = {
  getStatus: async (c: Context) => {
    const params = c.req.param();

    const validation = z.object({ id: z.string() }).safeParse(params);

    if (!validation.success) {
      return c.json(
        { error: "Invalid request", details: validation.error.errors },
        400
      );
    }

    const status = statusStore.getStatus(validation.data.id);

    if (!status) {
      return c.json({ error: "Status not found" }, 404);
    }

    return c.json({ status }, 200);
  },
};
