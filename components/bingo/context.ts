import { provide, inject } from 'vue';

import { type BingoContent, BingoRuntime } from 'bingolands';

const KEY = Symbol('bingo-context');

export interface BingoContext {
  dom: Ref<HTMLElement | undefined>;

  // Class scoped prefix
  scoped: string;

  runtime: BingoRuntime;

  refresh: (hash: string, content: BingoContent) => void;
}

export function provideBingoContext(hash: string, content: BingoContent) {
  const ctx: BingoContext = {
    scoped: `b${hash.slice(0, 6)}-`,
    dom: ref(),
    runtime: new BingoRuntime(content),
    refresh: (hash, content) => {
      ctx.scoped = `B${hash.slice(0, 6)}-`;
      ctx.runtime = new BingoRuntime(content);
    }
  };
  provide(KEY, ctx);
  return ctx;
}

export function injectBingoContext() {
  return inject<BingoContext>(KEY)!;
}
