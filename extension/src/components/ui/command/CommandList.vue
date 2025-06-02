<script setup>
import { cn } from '@/lib/utils';
import { ListboxContent, useForwardProps } from 'reka-ui';
import { computed } from 'vue';

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <ListboxContent
    data-slot="command-list"
    v-bind="forwarded"
    :class="
      cn(
        'max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto',
        props.class,
      )
    "
  >
    <div role="presentation">
      <slot />
    </div>
  </ListboxContent>
</template>
