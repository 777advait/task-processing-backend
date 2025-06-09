import { createQueue } from "@/utils/createQueue";
import { Queue } from "bullmq";

export const smsQueue = createQueue("sms");
