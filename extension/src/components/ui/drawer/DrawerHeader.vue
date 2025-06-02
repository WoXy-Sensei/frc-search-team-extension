<script setup>
import { cn } from '@/lib/utils';

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <div
    data-slot="drawer-header"
    :class="cn('flex flex-col gap-1.5 p-4', props.class)"
  >
    <slot />
  </div>
</template>
