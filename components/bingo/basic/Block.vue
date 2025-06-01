<script setup lang="ts">
import type { Block } from 'bingolands';

import { injectBingoContext } from '../context';

import InlineC from './Inline.vue';

const props = defineProps<{ node: Block }>();

const { node } = toRefs(props);

const ctx = injectBingoContext();

const className = computed(() => {
  return ['block', ...(node.value.class?.map((c) => ctx.scoped + c) ?? [])];
});
</script>

<template>
  <component :is="node.type" :style="node.style" :class="className">
    <InlineC v-for="(child, index) in node.content" :key="index" :node="child"></InlineC>
  </component>
</template>

<style>
.bingo-root .block {
  @apply: my-2;
}

.bingo-root h1.block {
  @apply: text-3xl font-bold;
}

.bingo-root h2.block {
  @apply: text-2xl font-bold;
}

.bingo-root h3.block {
  @apply: text-xl font-bold;
}

.bingo-root h4.block {
  @apply: text-lg font-bold;
}

.bingo-root h5.block {
  @apply: text-base font-bold;
}

.bingo-root h6.block {
  @apply: text-base font-bold;
}
</style>
