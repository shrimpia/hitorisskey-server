import { z } from 'zod';

export const startParam = z.object({
  invitationCode: z.string().optional().nullable(),
}).optional().nullable();

export type StartParam = z.infer<typeof startParam>;
