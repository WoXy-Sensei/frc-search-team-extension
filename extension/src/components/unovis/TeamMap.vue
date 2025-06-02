<script setup>
import { VisLeafletMap } from "@unovis/vue";
import { onMounted, ref, shallowRef, nextTick } from "vue";
import { Tooltip, LeafletMap } from "@unovis/ts";

const props = defineProps({
    teamNumber: {
        type: Number,
        required: true,
    },
});

const MAP_STYLE_URL =
    "https://api.maptiler.com/maps/0196e2c6-b32f-7e52-9f09-1b907532ba23/style.json?key=syYps7gKwwyjIwPbDOQh";
const ZOOM_DELAY_MS = 500;
const ZOOM_LEVEL = 17;

const attributionLinks = [
    `<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a>`,
    `<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a>`,
];

const mapRef = shallowRef(null);
const dataPoints = ref([]);

const getLatitude = (d) => d.lat;
const getLongitude = (d) => d.lng;
const getBottomLabel = (d) => d.bottomLabel;

const tooltip = new Tooltip({
    triggers: {
        [LeafletMap.selectors.point]: (d) => {
            if (d.isCluster) {
                return "<span></span>";
            }
            return `<div class="flex flex-col items-center bg-popover rounded-lg p-2 w-70 border shadow-lg">
              <img src='${import.meta.env.VITE_API_URL}/tba/frc${d.properties.id}/image'/>
              <p class="text-sm font-semibold pb-1 border-b w-full text-center mt-2">${d.properties.nickname}</p>

              <div class="flex flex-row items-center w-full mt-1.5">
                <div class="flex flex-row gap-1.5 items-center">
                  <p class="text-xs font-bold mr-1">Name :</p>
                </div>
                <p class="text-xs font-medium">${d.properties.name}</p>
              </div>

              <div class="flex flex-row items-center w-full mt-1.5">
                <div class="flex flex-row gap-1.5 items-center">
                  <p class="text-xs font-bold mr-1">State :</p>
                </div>
                <p class="text-xs font-medium">${d.properties.state_prov}</p>
              </div>

              <div class="w-full mt-1.5 flex flex-row items-start">
                <p class="text-xs font-bold mr-1 whitespace-nowrap w-fit flex-shrink-0">School Name :</p>
                <span class="text-xs font-medium break-words overflow-hidden">${d.properties.school_name}</span>
              </div>

              <div class="flex flex-row items-center w-full mt-1.5">
                <div class="flex flex-row gap-1.5 items-center">
                  <p class="text-xs font-bold mr-1">Postal Code :</p>
                </div>
                <p class="text-xs font-medium">${d.properties.postal_code}</p>
              </div>
            </div>`;
        },
    },
});

onMounted(async () => {
    await nextTick();

    try {
        const response = await fetch("/output.json");
        if (!response.ok) {
            throw new Error(
                `HTTP error! status: ${response.status} - Failed to fetch map data.`,
            );
        }
        const data = await response.json();
        dataPoints.value = data;
    } catch (error) {
        console.error("Error fetching map data:", error);
    }

    setTimeout(() => {
        mapRef.value?.component?.zoomToPointById(
            props.teamNumber,
            false,
            ZOOM_LEVEL,
        );
    }, ZOOM_DELAY_MS);
});
</script>

<template>
    <VisLeafletMap
        v-if="dataPoints.length > 0"
        ref="mapRef"
        :style="MAP_STYLE_URL"
        :data="dataPoints"
        :pointLatitude="getLatitude"
        :pointLongitude="getLongitude"
        :pointBottomLabel="getBottomLabel"
        :fitViewOnInit="false"
        :attribution="attributionLinks"
        :pointRadius="8"
        :tooltip="tooltip"
        height="230px"
    />
</template>

<style>
.leaflet-control-attribution {
    display: none !important;
}

text.css-31st86-bottom-label {
    transform: translate(0, -15px);
    font-size: 11px;
    fill: #fff !important;
    pointer-events: none;
}
</style>
