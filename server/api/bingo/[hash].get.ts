import { eq } from 'drizzle-orm';

import { bingos } from '~/drizzle/schema';

import { connectDatabase } from '../../utils/database';

export default defineEventHandler(async (event) => {
  const hash = getRouterParam(event, 'hash');

  if (!hash) {
    return { status: 'error', message: 'Bingo hash id 为空', owner: null, bingo: null };
  }

  const reqAuth = getCookie(event, 'bingo_auth_uuid');

  const db = await connectDatabase();
  const result = await db.select().from(bingos).where(eq(bingos.hash, hash)).execute();

  if (result.length === 1) {
    const data = result[0];
    return {
      status: 'ok',
      owner: data.auth === reqAuth ? data.auth : undefined,
      bingo: {
        hash: data.hash,
        name: data.name,
        content: data.content
      }
    };
  } else {
    return { status: 'error', message: '未找到 Bingo', owner: null, bingo: null };
  }
});
