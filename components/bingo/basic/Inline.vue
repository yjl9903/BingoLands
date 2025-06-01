<script setup lang="ts">
import type { Inline } from 'bingolands';

import { injectBingoContext } from '../context';

const props = defineProps<{ node: Inline }>();

const { node } = toRefs(props);

const ctx = injectBingoContext();

const className = computed(() => {
  return ['inline', ...(node.value.class?.map((c) => ctx.scoped + c) ?? [])];
});

const tag = typeof node.value === 'string' ? 'span' : node.value.attrs.href ? 'a' : node.value.type;

const href = typeof node.value === 'string' ? undefined : node.value.attrs.href;

const style = typeof node.value === 'string' ? '' : node.value.style;

const text = typeof node.value === 'string' ? node.value : node.value.content;
</script>

<template>
  <component :is="tag" :href="href" :class="className" :style="style">{{ text }}</component>
</template>
