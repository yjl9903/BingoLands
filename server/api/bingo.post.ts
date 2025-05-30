import * as z from 'zod';

import { connectDatabase } from '../utils/database';

const schema = z.object({
  name: z.string(),
  sourceCity: z.string(),
  targetCity: z.string(),
  type: z.enum(['buy', 'sell']),
  trend: z.enum(['up', 'same', 'down']),
  price: z.number().gt(0),
  percent: z.number().gt(0).lt(200),
  uploadedAt: z.coerce.date()
});

export default defineEventHandler(async (event) => {});
