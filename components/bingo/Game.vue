<script setup lang="ts">
import { toast } from 'vue-sonner';
import { domToBlob } from 'modern-screenshot';

import type { BingoGameTable } from 'bingolands';

import TableC from './Table.vue';

const props = defineProps<{ game: BingoGameTable }>();

const tableRef = useTemplateRef('table');

const domToImageBlob = async () => {
  if (!tableRef.value || !tableRef.value.$el) return;

  try {
    const blob = await domToBlob(tableRef.value?.$el, {
      scale: 2,
      filter(el) {
        if (el instanceof HTMLElement && el.classList.contains('remove')) {
          return false;
        }
        return true;
      }
    });

    return blob;
  } catch (error) {
    console.error(error);

    return undefined;
  }
};

const downloadImage = async () => {
  const blob = await domToImageBlob();
  if (!blob) {
    toast.error('下载图片失败');
    return;
  }

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'bingo.png';
  a.click();

  URL.revokeObjectURL(url);

  toast.success('下载图片成功');
};

const copyImage = async () => {
  const blob = await domToImageBlob();
  if (!blob) {
    toast.error('复制图片失败');
    return;
  }

  await navigator.clipboard.write([
    new ClipboardItem({
      [blob.type]: blob
    })
  ]);

  toast.success('复制图片成功');
};
</script>

<template>
  <div class="bingo-game">
    <TableC :node="game" ref="table"></TableC>
    <div class="flex justify-center gap-4">
      <Button @click="downloadImage">下载图片</Button>
      <Button @click="copyImage">复制图片</Button>
    </div>
  </div>
</template>
