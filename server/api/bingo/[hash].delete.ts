import { and, eq } from 'drizzle-orm';

import { bingos } from '~/drizzle/schema';

import { connectDatabase } from '../../utils/database';

export default defineEventHandler(async (event) => {
  const hash = getRouterParam(event, 'hash');
  const db = await connectDatabase();

  if (!hash) {
    return { status: 'error', message: 'Bingo hash id 为空', owner: null, bingo: null };
  }

  const reqAuth = getCookie(event, 'bingo_auth_uuid');

  const result = await db
    .delete(bingos)
    .where(and(eq(bingos.hash, hash), eq(bingos.auth, reqAuth ?? '')))
    .returning({ id: bingos.id })
    .execute();

  if (result.length === 1) {
    return {
      status: 'ok',
      id: result[0].id
    };
  } else {
    return { status: 'error', message: '未找到 Bingo', owner: null, bingo: null };
  }
});
