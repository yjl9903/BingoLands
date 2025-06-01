<script setup lang="ts">
import type { BingoTable } from 'bingolands';

import TableC from './table/Table.vue';

const props = defineProps<{ game: BingoTable }>();
</script>

<template>
  <div class="bingo-game">
    <TableC :node="game" ref="table"></TableC>
  </div>
</template>

<style>
.bingo-game {
  @apply: w-full overflow-x-auto;
}
</style>
