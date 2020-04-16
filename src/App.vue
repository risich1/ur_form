<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>

import '@/assets/css/main.css';


export default {
    name: 'App',
    data() {
        return {}
    },

}
</script>

<style>
    .button-center {
        margin: auto;
        display: block;
    }

    .form-content {
        position: relative;
    }
    #signature {
        border: double 3px transparent;
        border-radius: 5px;
        background-image: linear-gradient(white, white),
        radial-gradient(circle at top left, #4bc5e8, #9f6274);
        background-origin: border-box;
        background-clip: content-box, border-box;
    }

    .preloader {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        background: rgba(255,255,255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
