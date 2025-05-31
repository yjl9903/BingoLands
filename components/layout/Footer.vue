<script setup lang="ts"></script>

<template>
  <footer
    :class="['w-full', 'relative', 'flex', 'justify-center', 'border-t border-t-1 py-6 h-[220px]']"
  >
    <div class="main">
      <div :class="['[&_a:hover]:underline', 'text-main-600', 'lt-sm:text-sm']">
        <div class="flex mt-2">
          <span class="text-main-900 font-bold select-none">灵感</span>
          <span
            class="i-carbon:chevron-right text-xl lt-sm:text-base text-main-900 font-bold select-none relative top-[2px]"
          ></span>
          <span class="ml-2">来源于&nbsp;</span>
          <a href="https://x.com/localhost_4173" target="_blank">@低空飞行</a>
          <span>&nbsp;的作品&nbsp;</span>
          <a href="https://anime-sedai.egoist.dev/" target="_blank">动画世代</a>
        </div>
        <div class="flex mt-2">
          <span class="text-main-900 font-bold select-none">开源</span>
          <span
            class="i-carbon:chevron-right text-xl lt-sm:text-base text-main-900 font-bold select-none relative top-[2px]"
          ></span>
          <a href="https://github.com/yjl9903/AnimeBingo" target="_blank" class="ml-2 lt-sm:ml-2"
            >GitHub</a
          >
          <a
            href="https://github.com/yjl9903/AnimeBingo/issues"
            target="_blank"
            class="ml-4 lt-sm:ml-2"
          >
            建议反馈
          </a>
          <a href="https://animespace.onekuma.cn" target="_blank" class="ml-4 lt-sm:ml-2"
            >AnimeSpace 计划</a
          >
        </div>
        <div class="flex mt-2">
          <span class="text-main-900 font-bold select-none">更多</span>
          <span
            class="i-carbon:chevron-right lt-sm:text-base text-main-900 text-xl font-bold select-none relative top-[2px]"
          ></span>
          <a href="https://animes.garden" target="_blank" class="ml-2 lt-sm:ml-2"
            >AnimeGarden 动画资源聚合站</a
          >
          <a href="https://t.me/animebingo_user" target="_blank" class="ml-4 lt-sm:ml-2">
            Telegram
          </a>
          <!-- <a
            href="https://animespace.onekuma.cn/animegarden/search"
            target="_blank"
            class="ml-4 lt-sm:ml-2"
          >
            帮助文档
          </a>
          <a href="https://status.onekuma.cn/" target="_blank" class="ml-4 lt-sm:ml-2"> 监控 </a> -->
        </div>
        <div class="flex lt-lg:justify-center mt-8">
          <div class="">
            <span>
              © 2022-2025
              <a href="https://github.com/animegarden" target="_blank"> Anime Space</a>.
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
