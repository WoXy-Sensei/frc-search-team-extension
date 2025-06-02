<script setup>
import Box from "./boxes/Box.vue";
import LineChartDrawerBox from "./boxes/LineChartDrawerBox.vue";
import CountryBox from "./boxes/CountryBox";

defineProps({
    stats: {
        type: Array,
        required: true,
    },
    country: String,
});

const componentMap = {
    DrawerLineChart: LineChartDrawerBox,
    Box,
    Country: CountryBox,
};

const resolveComponentType = (type) => componentMap[type] || Box;
</script>

<template>
    <div class="flex flex-col gap-4 w-full">
        <div
            v-for="(row, rowIndex) in stats"
            :key="rowIndex"
            class="flex gap-5 items-center w-full"
        >
            <component
                v-for="(stat, colIndex) in row"
                :key="colIndex"
                :is="resolveComponentType(stat.type)"
                v-bind="stat"
            />
        </div>
    </div>
</template>
