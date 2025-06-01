import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

import type { BingoContent } from 'bingolands';

export const bingos = sqliteTable('bingos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  hash: text('hash').notNull().unique(),
  auth: text('auth').notNull(),
  name: text('name').notNull(),
  content: text('content', { mode: 'json' }).$type<BingoContent>().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
  compatibility: integer('compatibility').notNull()
});
