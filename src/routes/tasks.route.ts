import { Hono } from "hono";
import { tasksController } from "../controllers/tasks.controller";

const tasksRoute = new Hono();

/**
 * /api/v1/tasks/create - Create a new task
 * @param { TTask[] } task - The tasks to be created
 * @returns { message: string, metrics: {id: string, duration: string, status: TaskStatus, error?: string} }
 * @throws { 400 } - If the shape of the request body is invalid
 */
tasksRoute.post("/create", tasksController.createTasks);

export { tasksRoute };
