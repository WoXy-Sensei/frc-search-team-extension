<script setup>
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
} from "@/components/ui/drawer";
import LineChart from "@/components/unovis/LineChart.vue";
import { defineProps } from "vue";

const props = defineProps({
    chartData: {
        type: Array,
        required: true,
    },
    chartInfo: {
        type: Object,
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
        default: "#ff0000",
    },
});
</script>

<template>
    <Drawer>
        <DrawerTrigger as-child>
            <slot />
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>{{ props.chartTitle }}</DrawerTitle>
                <DrawerDescription class="text-xs">{{
                    props.chartDescription
                }}</DrawerDescription>
            </DrawerHeader>
            <div class="p-4">
                <LineChart
                    :data="props.chartData"
                    :chart-info="chartInfo"
                    :color="props.chartColor"
                />
            </div>
        </DrawerContent>
    </Drawer>
</template>
