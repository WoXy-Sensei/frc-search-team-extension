<script setup></script>

<template>
    <div class="loader"></div>
</template>

<style scoped>
.loader {
    display: inline-grid;
    width: 80px;
    aspect-ratio: 1;
    border-radius: 50%;
    overflow: hidden;
    outline: 7px solid #474847;
    outline-offset: -1px;
    animation: l2-0 6s linear infinite;
}
.loader:before,
.loader:after {
    content: "";
    grid-area: 1/1;
}
.loader:before {
    clip-path: polygon(
        evenodd,
        0 0,
        100% 0,
        100% 100%,
        0 100%,
        0 0,
        100% 50%,
        83.81% 59.06%,
        93.3% 75%,
        74.75% 74.75%,
        75% 93.3%,
        59.06% 83.81%,
        50% 100%,
        40.94% 83.81%,
        25% 93.3%,
        25.25% 74.75%,
        6.7% 75%,
        16.19% 59.06%,
        0% 50%,
        16.19% 40.94%,
        6.7% 25%,
        25.25% 25.25%,
        25% 6.7%,
        40.94% 16.19%,
        50% 0%,
        59.06% 16.19%,
        75% 6.7%,
        74.75% 25.25%,
        93.3% 25%,
        83.81% 40.94%,
        100% 50%
    );
    background: #474847;
}
.loader:after {
    margin: 12.5%;
    clip-path: polygon(
        100% 50%,
        78.19% 60.26%,
        88.3% 82.14%,
        65% 75.98%,
        58.68% 99.24%,
        44.79% 79.54%,
        25% 93.3%,
        27.02% 69.28%,
        3.02% 67.1%,
        20% 50%,
        3.02% 32.9%,
        27.02% 30.72%,
        25% 6.7%,
        44.79% 20.46%,
        58.68% 0.76%,
        65% 24.02%,
        88.3% 17.86%,
        78.19% 39.74%
    );
    background: #c0c0c0;
    transform: rotate(0turn) translate(15.625%) rotate(0turn);
    animation: l2-1 2s linear infinite;
}
@keyframes l2-0 {
    to {
        rotate: 1turn;
    }
}
@keyframes l2-1 {
    to {
        transform: rotate(1turn) translate(15.625%) rotate(-1.333turn);
    }
}
</style>
