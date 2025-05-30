import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

import type { BingoContent } from '~/bingo';

export const bingos = sqliteTable('bingos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  hash: text('hash').notNull().unique(),
  auth: text('auth').notNull(),
  name: text('name').notNull(),
  content: text('content', { mode: 'json' }).$type<BingoContent>().notNull()
});
