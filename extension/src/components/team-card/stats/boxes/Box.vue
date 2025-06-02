<script setup>
import { defineProps } from "vue";
import CounterEffectNumber from "@/components/gsap/CounterEffectNumber.vue";

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: false,
    },
    counterEffect: {
        type: Boolean,
        default: false,
    },
    counterEffectData: {
        type: Object,
    },
});
</script>

<template>
    <div
        class="flex flex-col items-center justify-center flex-1 gap-1 p-4 border rounded-xl"
    >
        <p class="text-sm">{{ props.label }}</p>
        <component
            class="text-lg font-semibold"
            :is="props.counterEffect ? CounterEffectNumber : 'p'"
            v-bind="counterEffectData"
        >
            {{ props.value }}
        </component>
    </div>
</template>
