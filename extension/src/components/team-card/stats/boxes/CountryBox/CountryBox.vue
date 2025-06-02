<script setup>
import FlagBackground from "./FlagBackground.vue";
import TeamMapPopover from "@/components/popovers/TeamMapPopover.vue";

const props = defineProps({
    value: {
        type: String,
        required: false,
    },
    showMap: {
        type: Boolean,
    },
    teamNumber: {
        type: Number,
        required: true,
    },
});
</script>

<template>
    <div
        class="flex flex-col items-center justify-center flex-1 gap-1 border-1 p-4 rounded-xl relative overflow-hidden"
    >
        <FlagBackground :country-name="value" />

        <component
            :is="showMap ? TeamMapPopover : 'div'"
            :team-number="teamNumber"
        >
            <p class="text-lg cursor-pointer" :class="{ underline: showMap }">
                Country
            </p>
        </component>

        <div class="flex flex-row items-center justify-center gap-2">
            <p class="font-bold text-xl">{{ value }}</p>
        </div>
    </div>
</template>
