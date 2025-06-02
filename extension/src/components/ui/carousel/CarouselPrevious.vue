<script setup>
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-vue-next';
import { useCarousel } from './useCarousel';

const props = defineProps({
  variant: { type: null, required: false, default: 'outline' },
  size: { type: null, required: false, default: 'icon' },
  class: { type: null, required: false },
});

const { orientation, canScrollPrev, scrollPrev } = useCarousel();
</script>

<template>
  <Button
    data-slot="carousel-previous"
    :disabled="!canScrollPrev"
    :class="
      cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class,
      )
    "
    :variant="variant"
    :size="size"
    @click="scrollPrev"
  >
    <slot>
      <ArrowLeft />
      <span class="sr-only">Previous Slide</span>
    </slot>
  </Button>
</template>
