export enum TaskStatus {
  /**
   * Task has been received and is queued for processing.
   * No worker has picked it up yet.
   */
  QUEUED = "QUEUED",

  /**
   * A worker has picked up the task and is currently executing it.
   */
  PROCESSING = "PROCESSING",

  /**
   * Task completed successfully with no errors.
   */
  COMPLETED = "COMPLETED",

  /**
   * Task failed during execution. Should be retried or reviewed.
   */
  FAILED = "FAILED",
}
