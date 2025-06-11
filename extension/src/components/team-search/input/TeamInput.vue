<script setup>
import { CommandInput } from "@/components/ui/command";
import { useTemplateRef } from "vue";
import { defineProps, defineEmits, defineExpose } from "vue";

defineProps({
    open: {
        type: Boolean,
        default: false,
    },
});

defineEmits(["update:open", "enter"]);

const inputEl = useTemplateRef("inputEl");

</script>

<template>
    <CommandInput
        ref="inputEl"
        class="h-8"
        placeholder="Enter Team"
        :autoFocus="false"
        @click="$emit('update:open', true)"
        @keydown.enter="$emit('enter')"
    />
</template>
