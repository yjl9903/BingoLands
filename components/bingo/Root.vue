<script setup lang="ts">
import type { BingoContent } from 'bingolands';

import GameC from './Game.vue';
import ShareC from './Share.vue';
import HeaderC from './Header.vue';
import FooterC from './Footer.vue';

import { provideBingoContext } from './context';

const props = defineProps<{ hash: string; content: BingoContent }>();

const { hash, content } = toRefs(props);

const bingoRef = useTemplateRef('root');

const { header, game, footer } = content.value;
const ctx = provideBingoContext(hash.value, content.value);

const dynamicStyle = computed(() => {
  const styles = content.value.styles ?? {};
  const rules: string[] = [];
  for (const [selector, body] of Object.entries(styles)) {
    const record = Object.entries(body);
    if (record.length === 0) continue;
    const text = record.map(([k, v]) => `${k}:${v};`).join('');
    rules.push(`.${ctx.scoped}${selector} { ${text} }`);
  }
  return rules.join('\n');
});

useHead({ style: [dynamicStyle] });

watch(
  () => [hash.value, content.value] as const,
  ([hash, content]) => {
    ctx.refresh(hash, content);
  }
);

watch(bingoRef, (ref) => {
  ctx.dom.value = ref ?? undefined;
});
</script>

<template>
  <div>
    <div class="bingo-root" ref="root">
      <HeaderC :blocks="header"></HeaderC>
      <GameC :game="game"></GameC>
      <FooterC :blocks="footer"></FooterC>
    </div>
    <ShareC></ShareC>
  </div>
</template>

<style>
.bingo-root,
.bingo-header,
.bingo-footer {
  @apply: space-y-8;
}
</style>
