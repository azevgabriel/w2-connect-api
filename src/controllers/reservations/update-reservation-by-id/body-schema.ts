// Warning: This file not use inversion of dependency, but it is a good practice to use it.

import { z } from 'zod';

export const addReservationBodySchema = z.object({
  startDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    })
    .transform((date) => new Date(date))
    .optional(),
  endDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    })
    .transform((date) => new Date(date))
    .optional(),
  type: z
    .enum(['flight', 'hotel', 'car', 'activity'], {
      errorMap: () => ({ message: 'Invalid type' }),
    })
    .optional(),
  value: z
    .number()
    .min(0, { message: 'Value must be greater than 0' })
    .optional(),
  status: z
    .enum(['confirmed', 'pending', 'cancelled'], {
      errorMap: () => ({ message: 'Invalid status' }),
    })
    .optional(),
});
