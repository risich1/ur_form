<template>
    <div class="help">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6.5" cy="6.5" r="6.5" fill="#5283FF"/>
            <path d="M5.902 10V4.654H6.804V10H5.902ZM6.364 3.554C6.188 3.554 6.03767 3.499 5.913 3.389C5.79567 3.279 5.737 3.13967 5.737 2.971C5.737 2.795 5.79567 2.65567 5.913 2.553C6.03767 2.443 6.188 2.388 6.364 2.388C6.54 2.388 6.68667 2.443 6.804 2.553C6.92867 2.65567 6.991 2.795 6.991 2.971C6.991 3.13967 6.92867 3.279 6.804 3.389C6.68667 3.499 6.54 3.554 6.364 3.554Z" fill="white"/>
        </svg>
        <div class="text">
            {{ text }}
        </div>
    </div>
</template>

<script>
    export default {
        props: ['text']
    }
</script>

<style scoped>
    .help {
        display: inline;
        position: relative;
    }

    .help .text {
        display: none;
        position: absolute;
        background: #F6F9FF;
        border: 1px solid rgba(31, 32, 65, 0.25);
        box-sizing: border-box;
        border-radius: 4px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
        padding-bottom: 14px;
        font-size: 14px;
        line-height: 115.36%;
        max-width: 400px;
        left: 21px;
        top: 0;
        width: 400px;
        z-index: 2;
    }

    .help:hover .text {
        display: block;
    }

    .help:hover svg circle {
        fill: #EBE9E9;
    }
</style>