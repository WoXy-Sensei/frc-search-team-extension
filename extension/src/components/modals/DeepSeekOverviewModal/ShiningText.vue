<template>
    <div class="shining-text">
        <slot />
    </div>
</template>

<style scoped>
.shining-text {
    background: #222 linear-gradient(to right, #222 0%, #fff 50%, #222 100%) 0 0
        no-repeat;
    background-size: 200%;
    color: rgba(255, 255, 255, 0.4);
    background-clip: text;
    -webkit-background-clip: text;
    animation-name: shine;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    text-shadow: 0 0 0 rgba(255, 255, 255, 0.5);
}

@keyframes shine {
    0% {
        background-position: -200%;
    }
    100% {
        background-position: 200%;
    }
}
</style>
