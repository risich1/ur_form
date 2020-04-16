<template>
    <header>
        <div class="socials">
            <a href="#" class="soc">f</a>
            <a href="#" class="soc"><img src="@/assets/img/instagram.svg" alt="."></a>
            <a href="#" class="soc">vk</a>
        </div>
        <a href="/" class="logo">
            <img src="@/assets/img/logo.svg" alt="logo">
            <span>Потребитель больше не платит</span>
        </a>
        <ul class="menu">
            <li>
                <router-link to="/">Главная</router-link>
            </li>
            <li><router-link to="/terms">Соглашение</router-link></li>
            <li><router-link to="/#footer">Наши контакты</router-link></li>
        </ul>
    </header>
</template>

<style scoped>
    header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 10px 2.085% 10px;
        border-bottom: 1px solid #d8e3fe;
        /*position: fixed;*/
        /*z-index: 2;*/
        /*top: 0;*/
        /*left: 0;*/
        width: 100%;
    }
    header .socials {
        max-width: 300px;
        width: 100%;
    }
    header .logo {
        font-size: 22px;
        line-height: 28px;
        color: #272727;
        text-align: center;
    }
    header .logo svg {
        max-width: 100%;
    }
    header .logo span {
        display: block;
    }
    header .menu li {
        display: inline-block;
        font-size: 14px;
        margin-right: 38px;
    }
    header .menu li:last-child {
        margin: 0;
    }
    header .menu li a {
        color: #000;
    }
</style>