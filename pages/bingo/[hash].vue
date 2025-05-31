<script setup lang="ts">
import { Bingo } from '~/components/bingo';

const route = useRoute();
const hash = route.params.hash as string;

const resp = await useFetch(`/api/bingo/${hash}`, {});

const bingo = computed(() => resp.data.value?.bingo);

if (!bingo.value) {
  await navigateTo('/');
}
</script>

<template>
  <Layout>
    <Head>
      <Title>{{ bingo?.name ? `${bingo.name} | BingoLands` : 'BingoLands' }}</Title>
    </Head>
    <Bingo v-if="bingo" :content="bingo.content"></Bingo>
  </Layout>
</template>
