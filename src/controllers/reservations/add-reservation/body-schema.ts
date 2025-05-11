// Warning: This file not use inversion of dependency, but it is a good practice to use it.

import { z } from 'zod';

export const addReservationBodySchema = z.object({
  startDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    })
    .transform((date) => new Date(date)),
  endDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    })
    .transform((date) => new Date(date)),
  type: z.enum(['flight', 'hotel', 'car', 'activity'], {
    errorMap: () => ({ message: 'Invalid type' }),
  }),
  value: z.number().min(0, { message: 'Value must be greater than 0' }),
  tripId: z.string().min(1, { message: 'Trip ID is required' }),
});
