<script setup lang="ts">
import { type BingoContent, hashBingoContent } from 'bingolands';

import AnimeData from '~/assets/anime-data.json';

import Layout from '~/components/layout/index.vue';
import { Bingo } from '~/components/bingo';
import { blocksToString } from '~/utils/block';

const data = AnimeData as BingoContent;
const description = blocksToString(data);
const hash = await hashBingoContent(data);
</script>

<template>
  <Layout>
    <Head>
      <Title>{{ `${data.name} | BingoLands` }}</Title>
      <Meta name="description" :content="description" />
    </Head>
    <Bingo :hash="hash" :content="data"></Bingo>
  </Layout>
</template>
