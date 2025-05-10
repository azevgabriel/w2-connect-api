// Aqui eu iria inverter a dependência
// Porém como meu tempo é curto, vou deixar assim mesmo XD

import { z } from 'zod';

export const addUserBodySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});
