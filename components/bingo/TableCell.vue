<script setup lang="ts">
import type { BingoGameCell } from '~/bingo';

import BlockC from './Block.vue';

const props = defineProps<{ node: BingoGameCell }>();

const { node } = toRefs(props);

const width = computed(() => Number.parseFloat(node.value.attrs?.width as any));
const verticalAlign = computed(() => node.value.attrs?.vertical || 'center');
const horizontalAlign = computed(() => node.value.attrs?.horizontal || 'center');

const defaultStyle = parseStyle(node.value.styles?.default);
const checkedStyle = parseStyle(node.value.styles?.checked);

const tdStyle = ref(defaultStyle);
</script>

<template>
  <td class="table-cell" :width="width" :style="{ ...tdStyle, width: width + 'px' }">
    <div class="table-cell-content w-full">
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
</style>
