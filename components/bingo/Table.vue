<script setup lang="ts">
import type { BingoGameTable } from '~/bingo';

import TableCell from './TableCell.vue';

const props = defineProps<{ node: BingoGameTable }>();

const { node } = toRefs(props);

const withBorder = computed(() => true);
</script>

<template>
  <table :class="['bingo-table', withBorder && 'with-border']">
    <thead></thead>
    <tbody>
      <tr v-for="(row, index) in node.cells" :key="index" class="table-row">
        <TableCell v-for="(cell, index) in row" :key="index" :node="cell" class="table-cell">
        </TableCell>
      </tr>
    </tbody>
  </table>
</template>

<style>
.bingo-table {
  /* @apply: w-full overflow-x-auto; */
  @apply: my-8;
  @apply: text-sm;
  @apply: bg-white;
}

.bingo-table.with-border {
  border-collapse: collapse;
}

.bingo-table.with-border td {
  @apply: border border-black;
}

.bingo-table.with-border tr:first-child td:first-child {
  border-top-left-radius: 0.25rem;
}
</style>
