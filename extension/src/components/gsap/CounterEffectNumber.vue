<template>
    <p ref="numberEl">{{ start }}</p>
</template>

<script setup>
import { gsap } from "gsap";
import { ref, onMounted } from "vue";

const props = defineProps({
    start: {
        type: Number,
        default: 0,
    },
    end: {
        type: Number,
        required: true,
        default: 1000,
    },
    increment: {
        type: Number,
        default: 1,
    },
    duration: {
        type: Number,
        default: 2,
    },
});

const numberEl = ref(null);

onMounted(() => {
    const tl = gsap.timeline();
    tl.counter(numberEl.value, {
        start: props.start,
        end: props.end,
        increment: props.increment,
        duration: props.duration,
    });
});
</script>
