import { emailQueue } from "@/queues/email.queue";
import { smsQueue } from "@/queues/sms.queue";
import { statusStore } from "@/stores/status.store";
import { TaskStatus } from "@/types/status.types";
import type { TTask, TTaskBatch } from "@/types/tasks.types";

class TasksService {
  async createTasks(tasks: TTaskBatch) {
    await Promise.all(
      tasks.map(async (task) => {
        let job;

        if (task.type === "email") {
          job = await emailQueue.add(task.type, task.payload, {
            jobId: task.id,
          });
        } else if (task.type === "sms") {
          job = await smsQueue.add(task.type, task.payload, { jobId: task.id });
        } else {
          return;
        }

        if (!job.id) {
          console.warn("Job has no ID! Skipping this task.");
          return;
        }

        statusStore.setStatus(job.id, TaskStatus.QUEUED);
      })
    );
  }
}

export const tasksService = new TasksService();
