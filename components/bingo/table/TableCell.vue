<script setup lang="ts">
import type { BingoTableCell } from 'bingolands';

import BlockC from '../basic/Block.vue';
import { injectBingoContext } from '../context';

const props = defineProps<{ node: BingoTableCell; row: number; col: number }>();

const { node, row, col } = toRefs(props);

const ctx = injectBingoContext();

const checked = ref(ctx.runtime.getState(row.value, col.value)?.checked ?? false);

const rowSpan = computed(() => node.value.rowspan);
const colSpan = computed(() => node.value.colspan);

const cellStyle = computed(() => {
  return node.value.style;
});

const dispose = ctx.runtime.watchState(row.value, col.value, (state) => {
  checked.value = state.checked;

  // Update local storage
  const filtered = ctx.localStorage.value.filter((p) => p[0] !== row.value || p[1] !== col.value);
  if (state.checked) {
    filtered.push([row.value, col.value]);
  }
  ctx.localStorage.value = filtered;
});

const onClick = () => {
  ctx.runtime.select(row.value, col.value);
  ctx.runtime.updateVariables();
};

onUnmounted(() => {
  dispose?.();
});
</script>

<template>
  <td
    :class="['table-cell', ...(node.class?.map((c) => ctx.scoped + c) ?? [])]"
    :style="cellStyle"
    :rowspan="rowSpan"
    :colspan="colSpan"
    :data-type="node.type"
    :checked="checked ? '' : undefined"
    @click="onClick"
  >
    <div :class="['table-cell-content']">
      <BlockC v-for="(child, index) in node.content" :key="index" :node="child"></BlockC>
    </div>
  </td>
</template>

<style>
.table-cell {
  @apply: p-2;
}

.table-cell-content {
  @apply: w-full;
}

.table-cell-content > :first-child {
  @apply: mt-0;
}

.table-cell-content > :last-child {
  @apply: mb-0;
}

.table-cell[data-type='checkbox'] {
  @apply: cursor-pointer;
}

.table-cell-content {
  @apply: w-full;
}
</style>
