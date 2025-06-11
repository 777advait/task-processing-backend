import type { Context } from "hono";
import { tasksService } from "../services/tasks.service";
import { STask, STaskBatch } from "@/types/tasks.types";

export const tasksController = {

  createTasks: async (c: Context) => {
    const body = await c.req.json();

    const validation = STaskBatch.safeParse(body);

    if (!validation.success) {
      return c.json(
        { error: "Invalid task", details: validation.error.errors },
        400
      );
    }

    tasksService
      .createTasks(validation.data)
      .catch((err) => console.error("Background task failed", err));
    return c.json({ message: "Tasks accepted for processing" }, 202);
  },
};
