<script setup lang="ts">
import type { CSSProperties } from 'vue';

import type { BingoGameCell } from 'bingolands';

import BlockC from '../basic/Block.vue';

const props = defineProps<{ node: BingoGameCell }>();

const { node } = toRefs(props);

const hovered = ref(false);
const checked = ref(false);

const width = computed(() => {
  const width = Number.parseFloat(node.value.attrs?.width as any);
  return Number.isNaN(width) ? undefined : width;
});

const rowSpan = computed(() => node.value.rowSpan);
const colSpan = computed(() => node.value.colSpan);
const verticalAlign = computed(() => node.value.attrs?.vertical || 'center');
const horizontalAlign = computed(() => node.value.attrs?.horizontal || 'center');

const defaultStyle = computed(() => {
  const dft = parseStyle(node.value.styles?.default);
  return { ...dft };
});
const hoverStyle = computed(() => {
  const hover = parseStyle(node.value.styles?.hover);
  if (node.value.type === 'checkbox') {
    return { ...hover };
  } else {
    return { ...hover };
  }
});
const checkedStyle = computed(() => {
  const user = parseStyle(node.value.styles?.checked);
  return { ...defaultStyle.value, ...user };
});

const onMouseEnter = () => {
  hovered.value = true;
};
const onMouseLeave = () => {
  hovered.value = false;
};

const onClick = () => {
  if (node.value.type === 'checkbox') {
    checked.value = !checked.value;
  } else if (node.value.type === 'content') {
    return;
  }
};

const tdStyle = computed((): CSSProperties => {
  if (hovered.value) {
    if (checked.value) {
      return {
        ...checkedStyle.value,
        ...hoverStyle.value
      };
    } else {
      return {
        ...defaultStyle.value,
        ...hoverStyle.value
      };
    }
  } else {
    if (checked.value) {
      return checkedStyle.value;
    } else {
      return defaultStyle.value;
    }
  }
});
</script>

<template>
  <td
    class="table-cell"
    :width="width"
    :style="tdStyle"
    :rowspan="rowSpan"
    :colspan="colSpan"
    :data-type="node.type"
    @click="onClick"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="table-cell-content w-full">
      <BlockC v-for="(child, index) in node.content" :key="index" :node="child"></BlockC>
    </div>
  </td>
</template>

<style>
.table-cell {
  @apply: p-2;
}

.table-cell-content > :first-child {
  @apply: mt-0;
}

.table-cell-content > :last-child {
  @apply: mb-0;
}

.table-cell[data-type='checkbox'] {
  @apply: cursor-pointer;
}

.table-cell-content {
  @apply: w-full;
}
</style>
