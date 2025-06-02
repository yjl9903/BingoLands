<script setup lang="ts">
import type { BingoTable } from 'bingolands';

import TableCell from './TableCell.vue';

const props = defineProps<{ node: BingoTable }>();

const { node } = toRefs(props);

const withBorder = computed(() => true);
</script>

<template>
  <table :class="['bingo-table', withBorder && 'with-border']">
    <thead></thead>
    <tbody>
      <tr v-for="(row, rIndex) in node.cells" :key="rIndex" class="table-row">
        <TableCell
          v-for="(cell, cIndex) in row"
          :key="cIndex"
          :node="cell"
          class="table-cell"
          :row="rIndex"
          :col="cIndex"
        >
        </TableCell>
      </tr>
    </tbody>
  </table>
</template>

<style>
.bingo-table {
  @apply: text-sm;
}

.bingo-table.with-border {
  border-collapse: collapse;
}

.bingo-table.with-border td {
  @apply: border border-black;
}
</style>
