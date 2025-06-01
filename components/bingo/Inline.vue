<script setup lang="ts">
import type { Inline } from 'bingolands';

const props = defineProps<{ node: Inline }>();

const { node } = toRefs(props);

const tag = typeof node.value === 'string' ? 'span' : node.value.attrs.href ? 'a' : node.value.type;

const href = typeof node.value === 'string' ? undefined : node.value.attrs.href;

const style = typeof node.value === 'string' ? '' : node.value.attrs.style;

const text = typeof node.value === 'string' ? node.value : node.value.content;
</script>

<template>
  <component :is="tag" :href="href" :style="style" class="inline">{{ text }}</component>
</template>
