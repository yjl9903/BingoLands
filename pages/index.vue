<script setup lang="ts">
import type { BingoContent } from '~/bingo';

import AnimeData from '~/assets/anime-data.json';

import Layout from '~/components/layout/index.vue';
import { Bingo } from '~/components/bingo';

const data = AnimeData as BingoContent;
</script>

<template>
  <Layout>
    <Bingo :content="data"></Bingo>
  </Layout>
</template>
