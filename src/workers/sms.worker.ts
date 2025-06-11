import { statusStore } from "@/stores/status.store";
import { TaskStatus } from "@/types/status.types";
import { createWorker } from "@/utils/createWorker";

export const smsWorker = createWorker("sms", async (job) => {
  const { from, message, to } = job.data;

  const id = job.id;

  if (!id) {
    console.warn("Job has no ID! Skipping this job.");
    return;
  }

  // Simulate sending a SMS
  statusStore.setStatus(id, TaskStatus.PROCESSING);

  console.log(
    `[SMS] ${from} sent an sms to ${to} with message: "${message}"`
  );

  statusStore.setStatus(id, TaskStatus.COMPLETED);
  return;
});

smsWorker.on("failed", (job, error) => {
  const id = job?.id;

  if (!id) {
    console.warn("Failed job has no ID!");
    return;
  }

  console.error(
    `[SMS] Failed to send sms from ${job.data.from} to ${job.data.to}:`,
    error.message
  );
  statusStore.setStatus(id, TaskStatus.FAILED);
});
