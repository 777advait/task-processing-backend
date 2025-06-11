import { emailQueue } from "@/queues/email.queue";
import { smsQueue } from "@/queues/sms.queue";
import { statusStore } from "@/stores/status.store";
import { TaskStatus } from "@/types/status.types";
import type { TTask } from "@/types/tasks.types";

class TasksService {
  private createTasks(tasks: TTask[]) {
    return tasks.map(async (task) => {
      const start = performance.now();
      try {
        let job;
        let duration: string;

        switch (task.type) {
          case "email":
            job = await emailQueue.add(task.id, task.payload, {
              jobId: task.id,
            });

            break;
          case "sms":
            job = await smsQueue.add(task.id, task.payload, { jobId: task.id });

            break;
          default:
            throw new Error(
              `Unsupported task type: ${(task as { type: string }).type}`
            );
        }

        if (!job.id) {
          throw new Error("Job has no ID! Cannot enqueue task.");
        }
        duration = `${(performance.now() - start).toFixed(2)}ms`;

        statusStore.setStatus(job.id, TaskStatus.QUEUED);
        console.log(`[TASKS] Enqueued task ${task.id} in ${duration}`);

        return { id: job.id, duration, status: statusStore.getStatus(job.id) };
      } catch (error) {
        const duration = `${(performance.now() - start).toFixed(2)}ms`;
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        console.error(
          `[TASKS]  Failed to enqueue task ${task.id} in ${duration}:`,
          errorMessage
        );

        statusStore.setStatus(task.id, TaskStatus.FAILED);

        return {
          id: task.id,
          duration,
          status: TaskStatus.FAILED,
          error: errorMessage,
        };
      }
    });
  }

  async enqueueTasks(tasks: TTask[]) {
    const results = await Promise.allSettled(this.createTasks(tasks));

    const metrics = results.map((result, index) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        const failedTask = tasks[index];
        console.error(
          `[TASKS] Unexpected promise rejection for task ${failedTask.id}:`,
          result.reason
        );

        return {
          id: failedTask.id,
          duration: "0ms",
          status: statusStore.getStatus(failedTask.id),
          error: result.reason?.message || "Promise rejected unexpectedly",
        };
      }
    });

    const successCount = metrics.filter(
      (m) => m.status === TaskStatus.QUEUED
    ).length;
    const failureCount = metrics.length - successCount;

    return {
      message:
        failureCount === 0
          ? `All ${successCount} tasks accepted for processing`
          : successCount === 0
          ? `All ${failureCount} tasks failed to enqueue`
          : `${successCount} tasks accepted, ${failureCount} failed`,
      metrics,
      summary: {
        total: tasks.length,
        successful: successCount,
        failed: failureCount,
      },
    };
  }
}

export const tasksService = new TasksService();
