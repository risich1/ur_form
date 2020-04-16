<template>
    <div v-show="data.show"  v-bind:class="{'text-input' : true, 'error' :data.error}">
        <div v-if="data.type === 'text'" class="form-group group-between">
            <label>{{ data.label }} <Help v-if="data.help" :text="data.help"></Help></label>
            <input v-mask="{mask: data.mask, greedy: true}" :disabled="data.disabled" type="text" @keyup="change" :class="{'form-control': true,  textInput: true, 'no-style' : data.noStyle, 'big-input' : data.size === 'big'}" v-model="data.value" v-bind:name="data.name">
        </div>

        <div v-if="data.type === 'number'" class="form-group group-between">
            <label>{{ data.label }} <Help v-if="data.help" :text="data.help"></Help></label>
            <input :disabled="data.disabled" type="number" @keyup="change" :class="{'form-control': true,  textInput: true, 'no-style' : data.noStyle, 'big-input' : data.size === 'big'}" v-model="data.value" v-bind:name="data.name">
        </div>

        <div v-if="data.type === 'textarea'" class="form-group group-between">
            <label>{{ data.label }}</label>
            <textarea class="form-control" v-model="data.value" v-bind:name="data.name"></textarea>
        </div>
    </div>
</template>



<script>
    import Help from '@/components/UI/Help';


    export default {
        components: {Help},
        props: ['data'],
        data() {
            return {

            }
        },
        name: "TextField",
        methods: {
            change() {
                let value = this.data.value;

                if(this.data.minlength)
                {
                    if(value.trim().length < this.data.minlength)
                        value = null;
                }
                this.$emit('change-field', this.data.name, value);
            }
        }
    }
</script>

<style scoped>
    .text-input.error  label {
        color: red;
    }

    .text-input.error input, .text-input.error textarea {
        border: 1px solid red;
    }

    input {
        color: #828282;
        box-shadow: none!important;
    }

    textarea {
        min-height: 152px;
        resize: none;
        padding-left: 16px;
        padding-right: 16px;
        box-shadow: none;
        margin-top: 10px;
    }

    .no-style {
        background: none;
        border: none;
    }

    .big-input {
        width: 100%;
        max-width: 250px;
    }
</style>