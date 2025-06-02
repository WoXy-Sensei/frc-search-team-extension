<script setup>
import {
    VisXYContainer,
    VisLine,
    VisAxis,
    VisTooltip,
    VisCrosshair,
} from "@unovis/vue";
import { defineProps } from "vue";

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    chartInfo: {
        type: Object,
        required: true,
    },
    color: {
        type: String,
        default: "hsl(var(--primary))",
    },
});

const x = (d) => d[props.chartInfo["x"]];
const y = (d) => d[props.chartInfo["y"]];

function extractX(dataArray) {
    const tickValues = dataArray.map((d) => d[props.chartInfo["x"]]);
    return tickValues;
}

const tooltipTemplate = (d) => `
  <div class="flex flex-col items-center bg-popover rounded-lg p-2 border w-32 shadow-lg">
    <p class="text-sm font-semibold pb-1 border-b w-full text-center">${d[props.chartInfo["y"]]}</p>
    <div class="flex flex-row items-center justify-between w-full mt-1.5">
      <div class="flex flex-row gap-1.5 items-center">
        <span class="w-2 h-2 rounded-full" style="background-color:${props.color}"></span>
        <p class="text-xs">Year</p>
      </div>
      <p class="text-xs font-medium">${d[props.chartInfo["x"]]}</p>
    </div>
  </div>
`;
</script>

<template>
    <VisXYContainer
        :data="props.data"
        :padding="{ top: 5 }"
        class="h-64 w-32"
        yDirection="south"
    >
        <VisLine :x="x" :y="y" curveType="linear" :color="props.color" />
        <VisTooltip />
        <VisAxis type="x" :gridLine="true" :tickLine="false" :x="x" />
        <VisAxis
            type="y"
            :gridLine="false"
            :tickLine="false"
            :domainLine="false"
            :y="y"
        />
        <VisCrosshair
            :template="tooltipTemplate"
            xDirection="east"
            yDirection="south"
        />
    </VisXYContainer>
</template>
