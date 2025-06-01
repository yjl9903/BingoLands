<script setup lang="ts">
import type { BingoContent } from 'bingolands';

import AnimeData from '~/assets/anime-data.json';

import Layout from '~/components/layout/index.vue';
import { Bingo } from '~/components/bingo';

const data = AnimeData as BingoContent;
</script>

<template>
  <Layout>
    <Head>
      <Title>{{ `Bangumi 高分动画宾果 | BingoLands` }}</Title>
    </Head>
    <Bingo hash="home" :content="data"></Bingo>
  </Layout>
</template>
