import { bingos } from '~/drizzle/schema';
import { type BingoContent, BingoContentSchema, hashBingoContent } from '~/bingo';

import { connectDatabase } from '../utils/database';

export default defineEventHandler(async (event) => {
  const body = await readBody<{ auth: string; content: BingoContent }>(event);

  const parsed = BingoContentSchema.safeParse(body.content);

  if (body.auth && parsed.success) {
    try {
      const content = parsed.data as BingoContent;
      const hash = await hashBingoContent(content);

      const db = await connectDatabase();

      const resp = await db
        .insert(bingos)
        .values([{ hash, auth: body.auth, name: content.name, content }])
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
          message: '禁止上传重复 Bingo'
        };
      }
    } catch (error) {
      console.error(error);

      return {
        status: 'error',
        message: (error as any).message || 'unknown error'
      };
    }
  } else {
    return {
      status: 'error',
      error: parsed.error
    };
  }
});
