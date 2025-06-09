import type { QueueTypes } from "@/types/queue.types";
import { redis as connection } from "@/core/redis";
import { Job, Worker } from "bullmq";

export const createWorker = <T extends keyof QueueTypes>(
  name: T,
  processor: (job: Job<QueueTypes[T]>) => Promise<void>
) =>
  new Worker<QueueTypes[T], void>(
    name,
    async (job: Job<QueueTypes[T]>) => await processor(job),
    {
      connection,
    }
  );
