<script setup lang="ts">
import type { BingoContent } from '~/bingo';

import Layout from '~/components/layout/index.vue';
import AnimeData from '~/anime-data.json';
import { Bingo } from '~/components/bingo';

const data = AnimeData as BingoContent;
</script>

<template>
  <Layout>
    <Bingo :content="data"></Bingo>
  </Layout>
</template>
