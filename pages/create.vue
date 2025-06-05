<script setup lang="ts">
import { toast } from 'vue-sonner';

import { type BingoContent, parseYamlContent, CompatibilityVersion } from 'bingolands';

import TemplateBingo from '~/assets/anime-data.yaml?raw';

import Layout from '~/components/layout/index.vue';
import { Bingo } from '~/components/bingo';
import { useAuthUuid } from '~/stores/auth';

const url = useRequestURL();

const tab = ref<'editor' | 'preview' | 'created'>('editor');

const text = ref(TemplateBingo);

const auth = useAuthUuid();
const created = ref<{ status: string; auth?: string; hash?: string }>();
const onSubmit = async () => {
  created.value = undefined;

  try {
    const parsed = parseYamlContent(text.value);
    if (parsed.success) {
      const resp = await $fetch('/api/bingo', {
        method: 'POST',
        body: {
          auth: auth.getOrSetAuth(),
          content: parsed.content,
          compatibility: CompatibilityVersion
        }
      });
      console.log(resp);

      created.value = { status: resp.status, auth: (resp as any)?.auth, hash: (resp as any)?.hash };

      if (resp.status === 'ok') {
        tab.value = 'created';
        toast.success('上传成功');
      } else {
        toast.error('上传失败: ' + (resp as any).message || '未知错误');
      }
    } else {
      console.error(parsed.error);
      toast.error('Bingo 配置解析失败, 请打开 F12');
    }
  } catch (err) {
    console.error(err);
    toast.error('上传失败');
  }
};
const getSharedLink = (hash: string) => {
  const link = new URL(url);
  link.pathname = `/bingo/${hash}`;
  return link.toString();
};
const copyLink = async () => {
  const link = getSharedLink(created.value?.hash!);
  await navigator.clipboard.writeText(link);
  toast.success('复制成功');
};

const previewError = ref<any>();
const previewContent = ref<BingoContent | undefined>(undefined);

const onPreview = async () => {
  try {
    tab.value = 'preview';
    const parsed = parseYamlContent(text.value);
    if (parsed.success) {
      previewContent.value = parsed.content;
    } else {
      console.log(parsed.error);
      previewError.value = JSON.stringify(parsed.error, null, 2);
    }
  } catch (error) {
    console.log(error);
    previewError.value = (error as any)?.message || '未知错误, 请打开 F12';
  }
};

const onPreivewExit = () => {
  tab.value = 'editor';
  previewContent.value = undefined;
  previewError.value = '';
};
</script>

<template>
  <Head>
    <Title>创建新的 Bingo | BingoLands 宾果群岛</Title>
    <Meta name="description" content="BingoLands 宾果群岛：生成可分享可交互的 Bingo 游戏！" />
  </Head>
  <Layout>
    <h1 class="text-3xl font-bold my-4">创建一个新的在线 Bingo 游戏!</h1>
    <div class="my-4">暂时只支持通过代码创建游戏, 可视化编辑器正在开发中...</div>
    <div class="my-4">
      数据结构暂时请参考 (让 AI)
      <a href="https://github.com/yjl9903/BingoLands" target="_blank" class="text-link"
        >GitHub 仓库</a
      >
      中提到的相关代码.
    </div>

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
    <div v-else-if="tab === 'preview'">
      <div class="my-4 space-x-2">
        <Button @click="onSubmit">上传</Button>
        <Button @click="onPreivewExit">编辑</Button>
      </div>
      <div class="border-b my-4"></div>
      <Bingo v-if="previewContent" hash="create" :content="previewContent"></Bingo>
      <div v-if="previewError">
        <pre><code>{{ previewError }}</code></pre>
      </div>
    </div>
    <div v-else-if="tab === 'created'">
      <div v-if="created && created.status === 'ok'" class="rounded-md border">
        <div class="text-xl font-bold text-green-5 border-b px-4 py-2">上传成功</div>
        <div class="px-4 py-2">
          <span class="font-bold mr-2">分享链接:</span>
          <nuxt-link :to="`/bingo/${created.hash!}`" class="text-link">{{
            getSharedLink(created.hash!)
          }}</nuxt-link>
          <Button variant="link" @click="copyLink">复制链接</Button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style></style>
