<template>
    <div class="spinner"></div>
</template>

<script lang="ts" setup></script>

<style scoped>
.spinner {
    width: 36px;
    height: 36px;
    border: 4px solid #f0f0f0;
    border-bottom-color: #ff3d00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
