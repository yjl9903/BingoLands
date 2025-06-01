import type { BingoContent } from './types';

import { serialize } from 'ohash';

export async function hashBingoContent(content: BingoContent) {
  const text = serialize(content);
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const digest = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(digest));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
