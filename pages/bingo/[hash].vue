<script setup lang="ts">
import Layout from '~/components/layout/index.vue';
import { Bingo } from '~/components/bingo';
import { blocksToString } from '~/utils/block';

const route = useRoute();
const hash = route.params.hash as string;

const resp = await useFetch(`/api/bingo/${hash}`, {});

const bingo = computed(() => resp.data.value?.bingo);

const description = computed(() =>
  bingo.value
    ? blocksToString(bingo.value?.content)
    : 'BingoLands 宾果群岛：生成可分享可交互的 Bingo 游戏！'
);

if (!bingo.value) {
  await navigateTo('/');
}
</script>

<template>
  <Layout>
    <Head>
      <Title>{{ bingo?.name ? `${bingo.name} | BingoLands` : 'BingoLands 宾果群岛' }}</Title>
      <Meta name="description" :content="description" />
    </Head>
    <Bingo v-if="bingo" :hash="hash" :content="bingo.content"></Bingo>
  </Layout>
</template>
