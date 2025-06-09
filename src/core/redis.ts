import { env } from "@/env";
import IORedis from "ioredis";

export const redis = new IORedis({
  maxRetriesPerRequest: null,
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
});
