import { z } from 'zod';

export const emailPasswordParam = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type EmailPasswordParam = z.infer<typeof emailPasswordParam>;
