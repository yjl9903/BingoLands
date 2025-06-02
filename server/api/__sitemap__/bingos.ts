import type { SitemapUrlInput } from '#sitemap/types';

import { defineSitemapEventHandler } from '#imports';

import { bingos } from '~/drizzle/schema';

import { connectDatabase } from '../../utils/database';

export default defineSitemapEventHandler(async () => {
  const db = await connectDatabase();

  const hashes = await db.select({ hash: bingos.hash }).from(bingos).execute();

  return hashes.map((hsh) => ({
    loc: `/bingo/${hsh}`,
    _sitemap: 'bingos'
  })) satisfies SitemapUrlInput[];
});
