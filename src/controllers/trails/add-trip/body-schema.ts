// Warning: This file not use inversion of dependency, but it is a good practice to use it.

import { z } from 'zod';

export const addTripBodySchema = z.object({
  startDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    })
    .transform((date) => new Date(date)),
  name: z.string().min(1, { message: 'Name is required' }),
  status: z.enum(['planned', 'in_progress', 'completed', 'canceled'], {
    errorMap: () => ({ message: 'Invalid status' }),
  }),
});
