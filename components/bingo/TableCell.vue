<script setup lang="ts">
import type { BingoGameCell } from '~/bingo';

import BlockC from './Block.vue';

const props = defineProps<{ node: BingoGameCell }>();

const { node } = toRefs(props);
</script>

<template>
  <td class="table-cell">
    <BlockC v-for="(child, index) in node.content" :key="index" :node="child"></BlockC>
  </td>
</template>
