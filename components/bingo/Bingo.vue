<script setup lang="ts">
import type { BingoContent } from '~/bingo';

import BlockC from './Block.vue';
import TableC from './Table.vue';

const props = defineProps<{ content: BingoContent }>();

const { content } = toRefs(props);

const { header, game, footer } = content.value;
</script>

<template>
  <div class="bingo">
    <div class="bingo-header">
      <BlockC v-for="(child, index) in header" :key="index" :node="child"></BlockC>
    </div>
    <div class="bingo-game">
      <TableC :node="game"></TableC>
    </div>
    <div class="bingo-footer">
      <BlockC v-for="(child, index) in footer" :key="index" :node="child"></BlockC>
    </div>
  </div>
</template>

<style>
.bingo-game {
  @apply: w-full overflow-x-auto;
}
</style>
