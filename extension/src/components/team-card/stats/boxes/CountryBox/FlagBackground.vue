<template>
    <div class="flag-bg" :style="flagStyle"></div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    countryName: {
        type: String,
        required: true,
    },
});

const countryToCode = {
    usa: "us",
    canada: "ca",
    china: "cn",
    "chinese taipei": "tw",
    israel: "il",
    brazil: "br",
    australia: "au",
    india: "in",
    mexico: "mx",
    türkiye: "tr",
};

const countryCode = computed(() => {
    const normalized = props.countryName.trim().toLowerCase();
    return countryToCode[normalized] ?? "eu";
});

const flagStyle = computed(() => ({
    backgroundImage: `
    linear-gradient(to right, rgba(9, 9, 11, 0.7), rgba(9, 9, 11, 1)),
    url("https://countryflagsapi.netlify.app/flag/${countryCode.value}.svg")
  `,
}));
</script>

<style scoped>
.flag-bg {
    position: absolute;
    width: 60%;
    height: 175px;
    border: none;
    overflow: hidden;
    left: -20px;
    bottom: -50px;
    transform: rotate(25deg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
}
</style>
