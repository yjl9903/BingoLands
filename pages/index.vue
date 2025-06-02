<script setup lang="ts">
import { type BingoContent, hashBingoContent } from 'bingolands';

import AnimeData from '~/assets/anime-data.json';

import Layout from '~/components/layout/index.vue';
import { Bingo } from '~/components/bingo';

const data = AnimeData as BingoContent;
const hash = await hashBingoContent(data);
</script>

<template>
  <Layout>
    <Head>
      <Title>{{ `${data.name} | BingoLands` }}</Title>
    </Head>
    <Bingo :hash="hash" :content="data"></Bingo>
  </Layout>
</template>
