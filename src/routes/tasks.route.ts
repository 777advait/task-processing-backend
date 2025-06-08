import { Hono } from "hono";
import { tasksController } from "../controllers/tasks.controller";

const tasksRoute = new Hono();

tasksRoute.post("/create", async (c) => await tasksController.createTask(c));
tasksRoute.post(
  "/create-batch",
  async (c) => await tasksController.createTasks(c)
);

export { tasksRoute };
