import type { TTask } from "./tasks.types";

export type QueueTypes = {
  [T in TTask["type"]]: Extract<TTask, { type: T }>["payload"];
};
