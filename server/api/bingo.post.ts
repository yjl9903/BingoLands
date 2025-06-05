import { bingos } from '~/drizzle/schema';
import {
  type BingoContent,
  hashBingoContent,
  normalizeContentInit,
  CompatibilityVersion
} from 'bingolands';

import { connectDatabase } from '../utils/database';

export default defineEventHandler(async (event) => {
  const body = await readBody<{ auth: string; content: BingoContent; compatibility?: number }>(
    event
  );

  const parsed = normalizeContentInit(body.content);

  if (body.auth && parsed.success) {
    try {
      const now = new Date();
      const content = parsed.content;
      const hash = (await hashBingoContent(content)).slice(0, 8);

      const db = await connectDatabase();

      const resp = await db
        .insert(bingos)
        .values([
          {
            hash,
            auth: body.auth,
            name: content.name,
            content,
            createdAt: now,
            updatedAt: now,
            compatibility:
              body.compatibility &&
              body.compatibility >= 0 &&
              body.compatibility <= CompatibilityVersion
                ? body.compatibility
                : CompatibilityVersion
          }
        ])
        .returning({ id: bingos.id, hash: bingos.hash })
        .onConflictDoNothing()
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
          message: ['禁止上传重复 Bingo']
        };
      }
    } catch (error) {
      console.error(error);

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
