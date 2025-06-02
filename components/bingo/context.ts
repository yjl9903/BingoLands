import type { RemovableRef } from '@vueuse/core';

import { provide, inject } from 'vue';

import { type BingoContent, BingoRuntime } from 'bingolands';

const KEY = Symbol('bingo-context');

export interface BingoContext {
  dom: Ref<HTMLElement | undefined>;

  // Class scoped prefix
  scoped: string;

  // Store user selected positions
  localStorage: RemovableRef<[number, number][]>;

  runtime: BingoRuntime;

  refresh: (hash: string, content: BingoContent) => void;
}

export function provideBingoContext(hash: string, content: BingoContent) {
  const localStorage = useLocalStorage<[number, number][]>(`bingo:${hash}`, []);

  const ctx: BingoContext = {
    scoped: `b${hash.slice(0, 6)}-`,
    dom: ref(),
    localStorage,
    runtime: new BingoRuntime(content),
    refresh: (hash, content) => {
      ctx.scoped = `B${hash.slice(0, 6)}-`;
      ctx.runtime = new BingoRuntime(content);
    }
  };

  if (!import.meta.env.SSR) {
    onMounted(() => {
      for (const pos of localStorage.value) {
        ctx.runtime.select(pos[0], pos[1]);
      }
      ctx.runtime.updateVariables();
    });
  }

  provide(KEY, ctx);

  return ctx;
}

export function injectBingoContext() {
  return inject<BingoContext>(KEY)!;
}
