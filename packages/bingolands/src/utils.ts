import type { BingoContent } from './types';

import basex from 'base-x';
import { serialize } from 'ohash';

const base58 = basex('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');

export async function hashBingoContent(content: BingoContent) {
  const text = serialize(content);
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const digest = await crypto.subtle.digest('SHA-1', data);
  const based = base58.encode(new Uint8Array(digest));
  return based;
}
