import type { QueueTypes } from "@/types/queue.types";
import { Queue } from "bullmq";
import { redis as connection } from "@/core/redis";

export const createQueue = <T extends keyof QueueTypes>(
  name: T
): Queue<QueueTypes[T]> => new Queue<QueueTypes[T]>(name, { connection });
