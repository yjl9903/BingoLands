<script setup lang="ts">
import type { Block } from 'bingolands';

import InlineC from './Inline.vue';

const props = defineProps<{ node: Block }>();

const { node } = toRefs(props);
</script>

<template>
  <component :is="node.type" :style="node.attrs.style" class="block">
    <InlineC v-for="(child, index) in node.content" :key="index" :node="child"></InlineC>
  </component>
</template>

<style>
.block {
  @apply: my-2;
}

h1.block {
  @apply: text-3xl font-bold;
}

h2.block {
  @apply: text-2xl font-bold;
}

h3.block {
  @apply: text-xl font-bold;
}

h4.block {
  @apply: text-lg font-bold;
}

h5.block {
  @apply: text-base font-bold;
}

h6.block {
  @apply: text-base font-bold;
}
</style>
