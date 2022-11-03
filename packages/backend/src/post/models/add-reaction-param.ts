import { z } from 'zod';

import { emojis } from '@/app/emojis.js';

export const addReactionParam = z.object({
  emoji: z.enum(emojis),
});

export type AddReactionParam = z.infer<typeof addReactionParam>;
