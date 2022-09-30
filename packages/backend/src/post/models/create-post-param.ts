import { z } from 'zod';

export const createPostParam = z.object({
  content: z.string(),
  annotation: z.string().optional(),
  channel: z.string(),
});

export type CreatePostParam = z.infer<typeof createPostParam>;
