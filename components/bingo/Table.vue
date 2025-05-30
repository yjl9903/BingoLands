<script setup lang="ts">
import type { BingoGameTable } from '~/bingo';

import TableCell from './TableCell.vue';

const props = defineProps<{ node: BingoGameTable }>();

const { node } = toRefs(props);
</script>

<template>
  <table class="bingo-table">
    <thead></thead>
    <tbody>
      <tr v-for="(row, index) in node.cells" :key="index" class="table-row">
        <TableCell v-for="(cell, index) in row" :key="index" :node="cell" class="table-cell">
        </TableCell>
      </tr>
    </tbody>
  </table>
</template>
