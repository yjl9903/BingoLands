<script setup lang="ts">
import type { Inline } from 'bingolands';

import { injectBingoContext } from '../context';

const props = defineProps<{ node: Inline }>();

const { node } = toRefs(props);

const ctx = injectBingoContext();

const className = computed(() => {
  return ['inline', ...(node.value.class?.map((c) => ctx.scoped + c) ?? [])];
});

const tag = node.value.attrs?.href ? 'a' : node.value.type;

const referenceVariable = computed(() => {
  if (node.value.reference) {
    const variable = ctx.runtime.getVariable(node.value.reference);
    return variable;
  }
  return undefined;
});

const referenceResult = computed(() => {
  if (referenceVariable.value) {
    const value = referenceVariable.value.value;
    return value.success ? '' + value.value : undefined;
  }
});

const text = ref(referenceResult?.value ?? node.value.content);

const dispose = node.value.reference
  ? ctx.runtime.watchVariable(node.value.reference, (_, newValue) => {
      text.value = newValue.success ? '' + newValue.value : node.value.content;
    })
  : undefined;

watch(node, (node) => {
  text.value = '' + node.content;
});

onUnmounted(() => {
  dispose?.();
});
</script>

<template>
  <component :is="tag" :href="node.attrs?.href" :class="className" :style="node.style">{{
    text
  }}</component>
</template>
