import { TaskStatus } from "@/types/status.types";
import type { TTask, TTaskBatch } from "@/types/tasks.types";

class TasksService {
  async createTask(
    task: TTask
  ): Promise<{ status: TaskStatus; message: string }> {
    // Simulate accepting a task
    return Promise.resolve({
      status: TaskStatus.QUEUED,
      message: `Task ${task.id} accepted successfully.`,
    });
  }

  async createTasks(
    tasks: TTaskBatch
  ): Promise<{ status: TaskStatus; message: string }[]> {
    return Promise.resolve(
      tasks.map((task) => ({
        status: TaskStatus.QUEUED,
        message: `Task ${task.id} accepted successfully`,
      }))
    );
  }
}

export const tasksService = new TasksService();
