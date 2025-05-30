import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const bingos = sqliteTable('bingos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  hash: text('hash').notNull().unique(),
  auth: text('auth').notNull(),
  name: text('name').notNull()
  // content:
});
