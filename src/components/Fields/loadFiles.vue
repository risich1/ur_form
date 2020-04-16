<template>
    <div v-show="data.show">
        <div class="form-group group-between">
            <label>{{ data.label }}</label>

            <div class="inputFile">
                <input :id="id" type="file" :multiple="data.multiply" @change="upload">
                <label :for="id">выберите файл</label>
            </div>
        </div>


        <div v-if="data.multiply" class="form-group group-between">
            <div class="file" v-bind:key="i" v-for="(file, i) in data.value" >
                {{ file.name }}
                <button @click="removeFile(i)">Удалить</button>
            </div>
        </div>
    </div>
</template>

<script>
// import Vue from 'vue';
// import axios from 'axios';
// import VueAxios from 'vue-axios';
// import AxiosPlugin from 'vue-axios-cors';
// Vue.use(VueAxios, AxiosPlugin, axios);

export default {
    props: ['data'],
    data() {
      return {
          id: this._uid,
          input: null,
          isImage: true
      }
    },
    methods: {
        upload(e) {
            if(!this.data.multiply) this.$emit('remove-file', 0, this.data.name);
            this.input = e;

            for(let i = 0; i < e.target.files.length; i++)
            {
                if(e.target.files[i].type !== 'image/jpeg' && e.target.files[i].type !== 'image/png')
                {
                    this.isImage = false;
                }
            }

            if(!this.isImage)
            {
                this.isImage = true;
                return alert('Выбранный вами файл не является изображением');
            }

            this.$emit('load-files', e.target.files, this.data.name);


        },
        removeFile(i) {
            this.$emit('remove-file', i, this.data.name);
        }
    }
}
</script>


<style scoped>

    .inputFile label {
        background: #EBE9E9;
        border: 1px solid rgba(31, 32, 65, 0.25);
        box-sizing: border-box;
        border-radius: 4px;
        font-size: 22px;
        line-height: 28px;
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 6px;
        padding-top: 2px;
        color: #828282;
        cursor: pointer;
    }

    .inputFile input {
        display: none;
    }
    .file {
        background: #EBE9E9;
        border: 1px solid rgba(31, 32, 65, 0.25);
        box-sizing: border-box;
        border-radius: 4px;
        font-size: 18px;
        line-height: 158.47%;
        color: #485075;
        width: 100%;
        height: 41px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 3px;
        margin-bottom: 7px;
    }

    .file:last-child {
        margin-bottom: 0;
    }

    .file button {
        color: #EB5757;
        background: 0;
        border: 0;
        display: inline;
        font-size: 22px;
        line-height: 1;
        outline: none;
    }
</style>