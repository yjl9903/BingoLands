import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import { bingos } from '../schema';

export const client = new Database('sqlite.db');

export const database = drizzle(client, { logger: false, schema: { bingos } });
