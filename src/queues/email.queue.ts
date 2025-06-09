import type { TTaskBatch } from "@/types/tasks.types";
import { createQueue } from "@/utils/createQueue";
import { Queue } from "bullmq";

export const emailQueue = createQueue("email");
