import { drizzle } from 'drizzle-orm/d1';

import { bingos } from '../schema';

export function connect(env = process.env) {
  const { DATABASE } = env ?? {};
  if (!DATABASE) {
    throw new Error(`Can not find d1 binding`);
  }

  const db = drizzle(DATABASE as any, {
    logger: false,
    schema: { bingos }
  });

  return db;
}
