<script setup lang="ts">
import type { BingoContent } from '~/bingo';

import AnimeData from '~/anime-data.json';
import { Bingo } from '~/components/bingo';

const data = AnimeData as BingoContent;
</script>

<template>
  <div>AnimeBingo</div>
  <div>
    <Bingo :content="data"></Bingo>
  </div>
</template>
