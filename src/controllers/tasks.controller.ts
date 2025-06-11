import type { Context } from "hono";
import { tasksService } from "../services/tasks.service";
import { STask, type TTask } from "@/types/tasks.types";
import z from "zod";

export const tasksController = {
  createTasks: async (c: Context) => {
    const body: TTask[] = await c.req.json();

    const validation = z.array(STask).safeParse(body);

    if (!validation.success) {
      return c.json(
        {
          error: "Invalid task",
          details: validation.error.errors.map((error) => ({
            path: error.path.join("."),
            message: error.message,
          })),
        },
        400
      );
    }

    const summary = await tasksService.enqueueTasks(validation.data);
    return c.json({ ...summary }, 202);
  },
};
