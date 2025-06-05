<script setup lang="ts">
import { toast } from 'vue-sonner';
import { stringifyContentToYaml } from 'bingolands';

import Layout from '~/components/layout/index.vue';
import { Bingo } from '~/components/bingo';
import { blocksToString } from '~/utils/block';

const route = useRoute();
const hash = route.params.hash as string;

const resp = await useFetch(`/api/bingo/${hash}`);

const bingo = computed(() => resp.data.value?.bingo);

const description = computed(() =>
  bingo.value
    ? blocksToString(bingo.value?.content)
    : 'BingoLands 宾果群岛：生成可分享可交互的 Bingo 游戏！'
);

if (!bingo.value) {
  await navigateTo('/');
}

const tab = ref<'editor' | 'preview'>('editor');

const text = ref(stringifyContentToYaml(bingo.value!.content));

const onSubmit = () => {
  toast.warning('暂未实现');
};

const onPreview = () => {
  toast.warning('暂未实现');
};
</script>

<template>
  <Layout>
    <Head>
      <Title>{{
        bingo?.name ? `编辑 ${bingo.name} | BingoLands 宾果群岛` : 'BingoLands 宾果群岛'
      }}</Title>
      <Meta name="description" :content="description" />
    </Head>

    <h1 class="text-3xl font-bold my-4">
      {{ bingo!.content.name }}
    </h1>

    <ClientOnly v-if="tab === 'editor'">
      <div class="my-4 space-x-2">
        <Button @click="onSubmit">上传</Button>
        <Button @click="onPreview">预览</Button>
      </div>
      <div class="border">
        <MonacoEditor v-model="text" lang="yaml" class="w-full h-[500px]" />
      </div>
      <div></div>
    </ClientOnly>
  </Layout>
</template>
