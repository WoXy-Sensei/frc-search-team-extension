<script setup>
import { CommandInput } from "@/components/ui/command";
import { defineProps, defineEmits } from "vue";

defineProps({
    open: {
        type: Boolean,
        default: false,
    },
});

defineEmits(["update:open"]);
</script>

<template>
    <CommandInput
        class="h-8"
        placeholder="Enter Team"
        :autoFocus="false"
        @click="$emit('update:open', true)"
    />
</template>
