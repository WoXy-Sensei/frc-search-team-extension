<script setup>
import CounterEffectNumber from "@/components/gsap/CounterEffectNumber.vue";
import { defineProps } from "vue";
import LineChartDrawer from "@/components/drawers/LineChartDrawer.vue";

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    value: {
        type: [String, Number],
        required: true,
    },
    counterEffect: {
        type: Boolean,
        default: false,
    },
    chartData: {
        type: Array,
        required: true,
    },
    chartTitle: {
        type: String,
        default: "Chart Data",
    },
    chartDescription: {
        type: String,
        default: "Detailed view of the data.",
    },
    chartColor: {
        type: String,
        default: "hsl(var(--primary))",
    },
    chartInfo: {
        type: Object,
        required: true,
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
        <LineChartDrawer
            :chart-color="chartColor"
            :chart-title="chartTitle"
            :chart-description="chartDescription"
            :chart-data="chartData"
            :chart-info="chartInfo"
        >
            <button class="text-sm font-medium underline cursor-pointer">
                {{ props.label }}
            </button>
        </LineChartDrawer>

        <component
            class="text-lg font-semibold"
            :is="props.counterEffect ? CounterEffectNumber : 'p'"
            v-bind="counterEffectData"
        >
            {{ props.value }}
        </component>
    </div>
</template>
