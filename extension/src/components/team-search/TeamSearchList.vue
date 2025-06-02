<script setup>
import {
    CommandList,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { defineProps } from "vue";

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
});
</script>

<template>
    <CommandList class="absolute top-[110px] z-10 bg-popover w-[365px]">
        <CommandGroup heading="Teams" v-if="props.items.length > 0">
            <CommandItem
                v-for="item in props.items"
                :key="item.key"
                :value="item.teamNumber"
                @select="$emit('selectedValue', item.teamNumber)"
            >
                {{ item.nickname }} <Badge>#{{ item.teamNumber }}</Badge>
            </CommandItem>
        </CommandGroup>
    </CommandList>
</template>
