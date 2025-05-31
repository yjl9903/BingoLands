import { drizzle } from 'drizzle-orm/d1';

import { bingos } from '../schema';

export function connect(env = process.env) {
  const { D1_DATABASE } = env ?? {};
  if (!D1_DATABASE) {
    throw new Error(`Can not find d1 binding`);
  }

  const db = drizzle(D1_DATABASE as any, {
    logger: false,
    schema: { bingos }
  });

  return db;
}
