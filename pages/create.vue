<script setup lang="ts">
const content = ref('');

const tab = ref<'editor' | 'created'>('editor');

const onSubmit = async () => {};
</script>

<template>
  <Layout>
    <h1 class="text-3xl font-bold my-4">创建一个新的在线 Bingo 游戏!</h1>
    <div class="my-4">暂时只支持通过代码创建游戏, 可视化编辑器正在开发中...</div>
    <ClientOnly v-if="tab === 'editor'">
      <div class="my-4 space-x-2" @click="onSubmit">
        <Button>创建 Bingo</Button>
      </div>
      <div class="border">
        <MonacoEditor v-model="content" lang="yml" class="w-full h-[500px]" />
      </div>
      <div></div>
    </ClientOnly>
    <div v-else-if="tab === 'created'">
      <div>创建成功</div>
    </div>
  </Layout>
</template>

<style></style>
