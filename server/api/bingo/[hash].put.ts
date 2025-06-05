import { and, eq } from 'drizzle-orm';

import {
  type BingoContent,
  normalizeContentInit,
  CompatibilityVersion
} from 'bingolands';

import { bingos } from '~/drizzle/schema';

import { connectDatabase } from '../../utils/database';

export default defineEventHandler(async (event) => {
  const hash = getRouterParam(event, 'hash');

  if (!hash) {
    return { status: 'error', message: 'Bingo hash id 为空', owner: null, bingo: null };
  }

  const body = await readBody<{ auth: string; content: BingoContent; compatibility?: number }>(
    event
  );

  const parsed = normalizeContentInit(body.content);

  if (body.auth && parsed.success) {
    try {
      const now = new Date();
      const content = parsed.content;
      const compatibility =
        body.compatibility && body.compatibility >= 0 && body.compatibility <= CompatibilityVersion
          ? body.compatibility
          : CompatibilityVersion;

      const db = await connectDatabase();
      const resp = await db
        .update(bingos)
        .set({
          name: content.name,
          content,
          updatedAt: now,
          compatibility
        })
        .where(and(eq(bingos.hash, hash), eq(bingos.auth, body.auth)))
        .returning({ id: bingos.id, hash: bingos.hash })
        .execute();

      if (resp.length === 1) {
        return {
          status: 'ok',
          id: resp[0].id,
          hash,
          auth: body.auth
        };
      } else {
        return {
          status: 'error',
          hash,
          message: ['未找到或无权限']
        };
      }
    } catch (error) {
      console.error('POST /api/bingos', error);

      return {
        status: 'error',
        message: [(error as any).message || '服务内部错误']
      };
    }
  } else {
    if (!parsed.success) {
      return {
        status: 'error',
        error: parsed.error
      };
    } else {
      return {
        status: 'error',
        error: ['未传入凭据']
      };
    }
  }
});
