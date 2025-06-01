<script setup lang="ts">
import type { Block } from 'bingolands';

import BlockC from './basic/Block.vue';

defineProps<{ blocks: Block[] }>();
</script>

<template>
  <div class="bingo-header">
    <BlockC v-for="(child, index) in blocks" :key="index" :node="child"></BlockC>
  </div>
</template>
