import type { Config } from 'drizzle-kit';

import 'dotenv/config';

export default {
  schema: './drizzle/schema/',
  out: './drizzle/migrations'
} satisfies Config;
