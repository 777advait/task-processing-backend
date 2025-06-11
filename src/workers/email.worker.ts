import { statusStore } from "@/stores/status.store";
import { TaskStatus } from "@/types/status.types";
import { createWorker } from "@/utils/createWorker";

export const emailWorker = createWorker("email", async (job) => {
  const { from, subject, to } = job.data;

  const id = job.id;

  if (!id) {
    console.warn("Job has no ID! Skipping this job.");
    return;
  }

  // Simulate sending an email
  statusStore.setStatus(id, TaskStatus.PROCESSING);

  console.log(
    `[EMAIL] ${from} sent an email to ${to} with subject: "${subject}"`
  );

  statusStore.setStatus(id, TaskStatus.COMPLETED);
  return;
});

emailWorker.on("failed", (job, error) => {
  const id = job?.id;
  

  if (!id) {
    console.warn("Failed job has no ID!");
    return;
  }

  console.error(
    `[EMAIL] Failed to send email from ${job.data.from} to ${job.data.to}:`,
    error.message
  );
  statusStore.setStatus(id, TaskStatus.FAILED);
});
