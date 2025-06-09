import type { TaskStatus } from "@/types/status.types";

const statusMap = new Map<string, TaskStatus>();

export const statusStore = {
  getStatus: (taskId: string): TaskStatus | undefined => {
    return statusMap.get(taskId);
  },

  setStatus: (taskId: string, status: TaskStatus): void => {
    statusMap.set(taskId, status);
  },
};
