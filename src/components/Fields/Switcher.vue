<template>
    <div class="form-group group-between">
        <label>{{ data.label }}</label>
        <label class="switch">
            <input @change="change" v-bind:name="data.label" v-model="data.value" type="checkbox">
            <span class="slider"></span>
        </label>
    </div>
</template>


<script>
    export default
    {
        props: ['data'],
        methods: {
            change() {
                this.$emit('change-field', this.data.name, this.data.value, this.data.dependField);
            }
        }
    }
</script>

<style scoped>

    .switch input {
        display: none;
    }

    .switch .slider {
        width: 87px;
        height: 40px;
        border-radius: 4px;
        border: 1px solid rgba(31, 32, 65, 0.25);
        display: block;
        cursor: pointer;
        position: relative;
        transition: all 0.3s;
        margin: 0;
    }

    .switch .slider:before {
        content: 'Нет';
        display: block;
        border-radius: 4px;
        position: absolute;
        left: -1px;
        bottom: -1px;
        width: 64px;
        border: 1px solid rgba(31, 32, 65, 0.25);
        height: 40px;
        text-align: center;
        box-sizing: border-box;
        line-height: 40px;
        font-size: 22px;
        background: #EBE9E9;
        transition: all 0.3s;
    }

    .switch .slider:after {
        content: 'Да';
        display: block;
        border-radius: 4px;
        position: absolute;
        left: -1px;
        bottom: -1px;
        width: 64px;
        border: 1px solid rgba(31, 32, 65, 0.25);
        height: 40px;
        text-align: center;
        box-sizing: border-box;
        line-height: 40px;
        font-size: 22px;
        background: #fff;
        opacity: 0;
        transition: all 0.3s;
    }

    .switch input:checked + .slider {
        background: #EBE9E9;
    }
    
    .switch input:checked + .slider:before {
        opacity: 0;
    }

    .switch input:checked + .slider:after {
        opacity: 1;
    }
</style>