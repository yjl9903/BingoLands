<script setup lang="ts">
import Giscus from '@giscus/vue';

useHead({
  title: '讨论区 | BingoLands'
});
</script>

<template>
  <Layout>
    <ClientOnly>
      <Giscus
        id="comments"
        repo="yjl9903/BingoLands"
        repoId="R_kgDOOzW99A"
        mapping="number"
        term="6"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="zh-CN"
      />
    </ClientOnly>
  </Layout>
</template>
