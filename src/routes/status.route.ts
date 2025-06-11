import { statusController } from "@/controllers/status.controller";
import { Hono } from "hono";

const statusRoute = new Hono();

/**
 * /api/v1/status/get/:id - get status of a task
 * @param { id: string } - the id of the task
 * @returns { status: TaskStatus }
 * @throws { 400 } - If the shape of the request body is invalid
 */
statusRoute.post("/get/:id", async (c) => await statusController.getStatus(c));

export { statusRoute };
