import { Hono } from "hono";
import { tasksRoute } from "./routes/tasks.route";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono().basePath("/api/v1");

// middlewares
app.use("*", logger(), prettyJSON());

/**
 * /api/v1/tasks/*
 */
app.route("/tasks", tasksRoute);

export default app;
