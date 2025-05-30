<script setup lang="ts">
import type { Block } from '~/bingo';

import InlineC from './Inline.vue';

const props = defineProps<{ node: Block }>();

const { node } = toRefs(props);

console.log(node.value);
</script>

<template>
  <component :is="node.type" :style="node.attrs.style" class="block">
    <InlineC v-for="(child, index) in node.content" :key="index" :node="child"></InlineC>
  </component>
</template>
