<script setup lang="ts">
import { toast } from 'vue-sonner';
import { domToBlob } from 'modern-screenshot';

import { injectBingoContext } from './context';

const ctx = injectBingoContext();

const domToImageBlob = async () => {
  if (!ctx.dom.value) return;

  try {
    const dom = ctx.dom.value;
    const rect = dom.getBoundingClientRect();

    const blob = await domToBlob(dom, {
      width: rect.width + 32 + 3,
      height: rect.height + 32 + 3 + 8,
      scale: 2,
      backgroundColor: 'white',
      style: {
        padding: '16px'
      },
      features: {
        copyScrollbar: false
      },
      filter(el) {
        if (el instanceof HTMLElement && el.classList.contains('remove')) {
          return false;
        }
        return true;
      },
      onCloneNode(cloned) {
        const table = (cloned as HTMLDivElement).querySelector('table');

        let cur = table;
        while (cur) {
          if (cur.style.width) {
            cur.style.width = Number.parseFloat(cur.style.width) + 3 + 'px';
            cur.style.height = Number.parseFloat(cur.style.height) + 3 + 'px';
          }
          cur = cur.parentElement as any;
        }
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
  <div class="flex justify-center gap-4">
    <Button @click="downloadImage">下载图片</Button>
    <Button @click="copyImage">复制图片</Button>
  </div>
</template>
