import { z } from "zod";

export const responseSchema = z.object({
    message: z.string(),
    status: z.string(),
});

export const registerResponseSchema = responseSchema.extend({
    id: z.string(),
});

export type RegisterResponse = z.infer<typeof registerResponseSchema>;