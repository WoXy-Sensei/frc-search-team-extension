<script setup>
import { cn } from "@/lib/utils";
import { Search } from "lucide-vue-next";
import { ListboxFilter, useForwardProps } from "reka-ui";
import { computed } from "vue";
import { useCommand } from ".";

defineOptions({
    inheritAttrs: false,
});

const props = defineProps({
    modelValue: { type: String, required: false },
    autoFocus: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    asChild: { type: Boolean, required: false },
    as: { type: null, required: false },
    class: { type: null, required: false },
});

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);

const { filterState } = useCommand();
</script>

<template>
    <div
        data-slot="command-input-wrapper"
        class="flex h-12 items-center gap-2 px-3 flex-1"
    >
        <Search class="size-4 shrink-0 opacity-50" />
        <ListboxFilter
            v-bind="{ ...forwardedProps, ...$attrs }"
            v-model="filterState.search"
            data-slot="command-input"
            :auto-focus="false"
            :class="
                cn(
                    'placeholder:text-muted-foreground flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
                    props.class,
                )
            "
        />
    </div>
</template>
