// Warning: This file not use inversion of dependency, but it is a good practice to use it.

import { z } from 'zod';

export const loadTripsQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((value) => (value ? parseInt(value, 10) : undefined)),
  page: z
    .string()
    .optional()
    .transform((value) => (value ? parseInt(value, 10) : undefined)),
  filters: z
    .object({
      status: z.enum(['planned', 'in_progress', 'completed', 'canceled'], {
        errorMap: () => ({ message: 'Invalid status' }),
      }),
    })
    .optional(),
});
