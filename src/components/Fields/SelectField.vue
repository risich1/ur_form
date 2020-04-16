<template>

    <div v-bind:class="{'form-group group-between' : true, 'error' :data.error}">
        <label>{{ data.label }}</label>
<!--        <v-select-->
<!--                :options="data.options"-->
<!--                v-model="data.value"-->

<!--        >-->
<!--        </v-select>-->
        <div class="select-box">
            <select v-model="data.value" :name="data.name">
                <option :key="key" v-for="(option, key) in data.options" :value="option.value">{{ option.name }}</option>
            </select>
            <div class="arrow"></div>
        </div>
    </div>
</template>

<script>
    // import vSelect from 'vue-select';
    // import 'vue-select/dist/vue-select.css';

    export default {
        name: "Select",
        props: ['data'],
        // components: {'v-select': vSelect},
        data() {
            return {

            }
        },
        methods: {
            change() {
                this.$emit('change-field', this.data.name, this.data.value);
            }
        }
    }
</script>

<style scoped>
    .error label {
        color: red;
    }


    .select-box {
        position: relative;
    }

    select {
        width: 250px;
        height: 40px;
        border: 1px solid rgba(31, 32, 65, 0.25);
        box-sizing: border-box;
        border-radius: 4px;
        font-size: 20px;
        -webkit-appearance: none;
        appearance: none;
        position: relative;
        padding-right: 33px;
        padding-left: 15px;
    }

    .select-box .arrow {

    }

    .select-box:before {
        content: '';
        display: block;
        position: absolute;
        right: 10px;
        top: 15px;
        z-index: 1;
        border: 8px solid transparent;
        border-top: 12px solid #C7C7CF;
        pointer-events: none;

    }

    .select-box:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 33px;
        height: 100%;
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #C7C7CF;
        border-radius: 0px 4px 4px 0px;
        pointer-events: none;

    }

    select::-ms-expand {	display: none; }

</style>