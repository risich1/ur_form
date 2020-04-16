<template>
    <table class="table">

        <tr v-show="field.name !== 'check'" :key="key" v-for="(field, key) in formData[0]">
            <td>{{ field.label }}</td>
            <td>
                <span v-if="
                field.type === 'text' ||
                field.type === 'textarea' ||
                field.type === 'number' ||
                field.type === 'date' ||
                field.type === 'select'">{{ field.value }}</span>
                <span v-if="field.type === 'switch'">{{ field.value === true ? 'да' : 'нет' }}</span>
                <ul v-if="field.type === 'multiFile'">
                   <li :key="i" v-for="(file, i) in field.value">{{ file.name }}</li>
                </ul>
            </td>
        </tr>

        <tr v-show="field.name !== 'check'" :key="key" v-for="(field, key) in formData[1]">
            <td>{{ field.label }}</td>
            <td>
                <span v-if="
                field.type === 'text' ||
                field.type === 'textarea' ||
                field.type === 'date' ||
                field.type === 'select'">{{ field.value }}</span>
                <span v-if="field.type === 'switch'">{{ field.value === true ? 'да' : 'нет' }}</span>
                <ul v-if="field.type === 'multiFile'">
                    <li :key="i" v-for="(file, i) in field.value">{{ file.name }}</li>
                </ul>
            </td>
        </tr>
    </table>
</template>

<script>
    export default {
        props: ['formData'],
        beforeUpdate() {
            // for(let i of this.myData.photos.keys())
            // {
            //     console.log(i);
            // }

        },
        data() {
          return {
              myData: this.formData
          }
        },
        methods: {

        }
    }
</script>

<style scoped>
    .table {
        border: 1px dashed #C4C4C4;
        margin-bottom: 45px;
    }

    .table + label {
        font-size: 22px;
    }

    .table td {
        border-top: 1px dashed #C4C4C4;
        border-bottom: 1px dashed #C4C4C4;
    }

    .table td {
        width: 50%;
    }

    .table td:first-child {
        border-right: 1px dashed #C4C4C4;;
    }
</style>