<script setup lang="ts">
import type { BingoContent } from 'bingolands';

import AnimeData from '~/assets/anime-data.json';

import Layout from '~/components/layout/index.vue';
import { Bingo } from '~/components/bingo';
import { blocksToString } from '~/utils/block';

const hash = AnimeData.hash;
const content = AnimeData.content as BingoContent;
const description = blocksToString(content);
</script>

<template>
  <Layout>
    <Head>
      <Title>{{ `${content.name} | BingoLands` }}</Title>
      <Meta name="description" :content="description" />
    </Head>
    <Bingo :hash="hash" :content="content"></Bingo>
  </Layout>
</template>
