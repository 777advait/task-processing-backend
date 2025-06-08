import type { Context } from "hono";
import { tasksService } from "../services/tasks.service";
import { STask, STaskBatch } from "@/types/tasks.types";

export const tasksController = {
  createTask: async (c: Context) => {
    const body = await c.req.json();

    const validation = STask.safeParse(body);

    if (!validation.success) {
      return c.json(
        { error: "Invalid task", details: validation.error.errors },
        400
      );
    }

    c.executionCtx.waitUntil(tasksService.createTask(validation.data));
    return c.json({ message: "Task accepted for processing" }, 202);
  },

  createTasks: async (c: Context) => {
    const body = await c.req.json();

    const validation = STaskBatch.safeParse(body);

    if (!validation.success) {
      return c.json(
        { error: "Invalid task", details: validation.error.errors },
        400
      );
    }

    c.executionCtx.waitUntil(tasksService.createTasks(validation.data));
    return c.json({ message: "Tasks accepted for processing" }, 202);
  },
};
