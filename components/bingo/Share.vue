<script setup lang="ts">
import { toast } from 'vue-sonner';
import { domToBlob } from 'modern-screenshot';

import { injectBingoContext } from './context';

const url = useRequestURL();

const ctx = injectBingoContext();

const domToImageBlob = async () => {
  if (!ctx.dom.value) return;

  try {
    const rootDom = ctx.dom.value;
    const tableDom = ctx.dom.value.querySelector(
      '.bingo-game > table.bingo-table'
    ) as HTMLTableElement | null;

    const rootRect = rootDom.getBoundingClientRect();
    const tableWidth = tableDom?.clientWidth || 0;

    const minWidth = 1024;
    const contentWidth = Math.max(rootRect.width, tableWidth, minWidth) + 3;
    const contentHeight = rootRect.height + 3 + 8;

    const blob = await domToBlob(rootDom, {
      width: contentWidth + 32 * 2,
      height: contentHeight + 32 * 2,
      scale: 2,
      backgroundColor: 'white',
      style: {
        paddingLeft: '32px',
        paddingRight: '32px',
        paddingTop: '32px',
        paddingBottom: '32px'
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
            cur.style.width = contentWidth + 'px';
            cur.style.height = Number.parseFloat(cur.style.height) + 3 + 'px';
          }
          cur = cur.parentElement as any;
        }

        const blocks = [
          ...(cloned as HTMLDivElement).querySelectorAll('.bingo-header .block'),
          ...(cloned as HTMLDivElement).querySelectorAll('.bingo-footer .block')
        ];
        for (const block of blocks) {
          (block as HTMLDivElement).style.width = contentWidth + 'px';
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

const copyURL = async () => {
  await navigator.clipboard.writeText(url.toString());
  toast.success('复制链接成功');
};
</script>

<template>
  <div class="flex justify-center gap-4">
    <Button @click="downloadImage" size="sm">
      <span class="i-carbon-download"></span>
      <span>下载图片</span>
    </Button>
    <Button @click="copyImage" size="sm">
      <span class="i-carbon-copy"></span>
      <span>复制图片</span>
    </Button>
    <Button @click="copyURL" variant="secondary" size="sm">
      <span class="i-carbon-share"></span>
      <span>分享链接</span>
    </Button>
  </div>
</template>
