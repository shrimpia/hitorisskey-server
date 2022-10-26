import { z } from 'zod';

export const paginationQuery = z.object({
  cursor: z.string().optional(),
  limit: z.number().default(10),
});

export type PaginationQuery = z.infer<typeof paginationQuery>;
