<script setup lang="ts">
import Footer from './Footer.vue';
import { Button } from '../ui/button';

const props = withDefaults(defineProps<{}>(), {});
</script>

<template>
  <nav class="w-screen border-b border-b-gray-200 bg-white absolute top-0">
    <div class="w-screen h-[64px]">
      <div class="main h-full flex items-center">
        <NuxtLink to="/" class="select-none flex items-center outline-none">
          <img src="/bulb.svg" class="h-8 w-8 mr-2 rotate--30" />
          <div class="text-2xl font-quicksand font-bold lt-md:hidden">AnimeBingo</div>
        </NuxtLink>
        <div class="flex-auto"></div>
        <div class="flex items-center">
          <nuxt-link to="/create">
            <Button
              variant="outline"
              class="text-green-500 bg-green-100/50 border-green-600 hover:(text-green-500 bg-green-100/80 border-green-700)"
              >创建 Bingo!</Button
            >
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
  <main class="w-screen mt-[64px] min-h-[calc(100vh-64px-224px)] pt-8 pb-16">
    <div class="main">
      <slot></slot>
    </div>
  </main>
  <Footer></Footer>
</template>

<style></style>
