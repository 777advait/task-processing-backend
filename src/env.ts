import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
  server: {
    REDIS_HOST: z.string(),
    REDIS_PORT: z.coerce.number(),
    REDIS_PASSWORD: z.string(),
    REDIS_USERNAME: z.string(),
  },
  runtimeEnv: process.env,
});
