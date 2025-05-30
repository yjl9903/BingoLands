import { createStorage } from 'unstorage';
import memoryDriver from 'unstorage/drivers/memory';
import cloudflareKVBindingDriver from 'unstorage/drivers/cloudflare-kv-binding';

import { type DrizzleD1Database } from 'drizzle-orm/d1';

import { connect } from '~/drizzle/d1/connect';
// import { initialize } from '~/drizzle/d1/initialize';
import { bingos } from '~/drizzle/schema';

export async function connectDatabase(): Promise<DrizzleD1Database<{ bingos: typeof bingos }>> {
  if (import.meta.dev) {
    const { database } = await import('~/drizzle/dev/connect');
    return database as any;
  } else {
    const db = connect((globalThis as any).__env__);
    // await initialize(db);

    return db;
  }
}

export function connectStorage() {
  if (import.meta.dev) {
    return createStorage({
      driver: memoryDriver()
    });
  } else {
    return createStorage({
      // @ts-ignore
      driver: cloudflareKVBindingDriver({ binding: globalThis.__env__?.STORAGE })
    });
  }
}
