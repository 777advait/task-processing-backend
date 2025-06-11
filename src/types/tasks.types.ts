import { z } from "zod";

const EmailPayloadSchema = z.object({
  from: z.string().email(),
  to: z.string().email(),
  subject: z.string(),
});

const SmsPayloadSchema = z.object({
  from: z.string(),
  to: z.string(),
  message: z.string(),
});

export const STask = z.discriminatedUnion("type", [
  z.object({
    id: z.string(),
    type: z.literal("email"),
    payload: EmailPayloadSchema,
  }),
  z.object({
    id: z.string(),
    type: z.literal("sms"),
    payload: SmsPayloadSchema,
  }),
]);

export type TTask = z.infer<typeof STask>;
export const STaskBatch = z.array(STask);

export type TTaskBatch = z.infer<typeof STaskBatch>;
