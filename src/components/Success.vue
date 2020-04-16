<template>
    <div class="sendSuccess ">
        <div class="container-ext-small">
            <h2 class="step-title">Поздравляем! <br> <span>ВАША  ПРЕТЕНЗИЯ  УСПЕШНО СФОРМИРОВАНА</span></h2>
            <div class="text">
                <ol>
                    <li>Мы проверим Вашу претензию  </li>
                    <li>Мы направим Вашу претензию продавцу</li>
                    <li>Мы уведомим Вас об ответе продаца</li>
                    <li>Если в вашей претензии будет отказано, мы сообщим Вам план дальнейших действий</li>
                </ol>
            </div>
            <button @click="showDeal" class="btn btn-primary btn-next button-center">Далее</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Success",
        methods: {
            showDeal()
            {
                this.$emit('click-btn', true);
            }
        }
    }
</script>

<style scoped>

</style>