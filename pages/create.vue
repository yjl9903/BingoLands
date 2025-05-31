<script setup lang="ts">
import { parse } from 'yaml';
import { toast } from 'vue-sonner';

import { type BingoContent, BingoContentSchema } from '~/bingo';

import TemplateBingo from '~/assets/anime-data.yml?raw';

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
    const json = parse(text.value);
    const parsed = BingoContentSchema.safeParse(json);
    if (parsed.success) {
      const resp = await $fetch('/api/bingo', {
        method: 'POST',
        body: {
          auth: auth.getOrSetAuth(),
          content: parsed.data
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
const copyLink = async (hash: string) => {
  const link = getSharedLink(hash);
  await navigator.clipboard.writeText(link);
};

const previewError = ref<any>();
const previewContent = ref<BingoContent | undefined>(undefined);

const onPreview = async () => {
  try {
    tab.value = 'preview';
    const json = parse(text.value);
    const parsed = BingoContentSchema.safeParse(json);
    if (parsed.success) {
      previewContent.value = parsed.data as BingoContent;
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
  <Layout>
    <h1 class="text-3xl font-bold my-4">创建一个新的在线 Bingo 游戏!</h1>
    <div class="my-4">暂时只支持通过代码创建游戏, 可视化编辑器正在开发中...</div>
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
      <div class="my-4 space-x-2" @click="onSubmit">
        <Button @click="onSubmit">上传</Button>
        <Button @click="onPreivewExit">编辑</Button>
      </div>
      <div class="border-b my-4"></div>
      <Bingo v-if="previewContent" :content="previewContent"></Bingo>
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
