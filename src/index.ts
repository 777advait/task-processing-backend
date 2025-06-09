import { Hono } from "hono";
import { tasksRoute } from "./routes/tasks.route";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

// registry imports
import "@/workers/email.worker";

const app = new Hono().basePath("/api/v1");

// middlewares
app.use("*", logger(), prettyJSON());

/**
 * /api/v1/tasks/*
 */
app.route("/tasks", tasksRoute);

// Startup logic
// const port = 8787;
// console.log(`🚀 Server is starting on http://localhost:${port}/api/v1`);

export default app;
