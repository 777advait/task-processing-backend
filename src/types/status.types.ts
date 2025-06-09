export enum TaskStatus {
  /**
   * Task has been received and is queued for processing.
   * No worker has picked it up yet.
   */
  QUEUED = "queued",

  /**
   * A worker has picked up the task and is currently executing it.
   */
  PROCESSING = "processing",

  /**
   * Task completed successfully with no errors.
   */
  COMPLETED = "completed",

  /**
   * Task failed during execution. Should be retried or reviewed.
   */
  FAILED = "failed",
}
