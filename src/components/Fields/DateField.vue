<template>
    <div class="form-group group-between">
        <label>{{ data.label }}</label>
        <div class="datepicker-wrap">
            <img src="@/assets/img/icons/calendar.svg" alt=".">
            <Datepicker
                    :language="ru"
                    :format="customFormatter"
                    :placeholder="'Выберите дату'"
                    :value="date"
                    :monday-first="true"
                    @selected="change"></Datepicker>
        </div>
<!--        <input @change="change" type="date" class="form-control textInput" v-model="data.value" v-bind:name="data.name">-->
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import moment from 'moment';
    import {ru} from 'vuejs-datepicker/dist/locale';
    export default {
        components: {
            Datepicker
        },
        props : ['data'],
        mounted()
        {
            // console.log(moment(this.data.value).unix());
            this.$emit('change-field', this.data.name, this.customFormatter(this.date));
        },
        data() {
            return {
                ru: ru,
                date: this.data.value ? Date.parse(this.data.value) : Date.now(),
                icon: '123'
            }
        },
        methods: {
            change(date) {
                date = this.customFormatter(date);
                this.$emit('change-field', this.data.name, date);
            },

            customFormatter(date) {
                return moment(date).format('DD.MM.Y');
            }
        }
    }
</script>


<style>
    .vdp-datepicker {
        position: relative;
    }

    .vdp-datepicker input[type=text] {
        max-width: 250px;
        height: 40px;
        color: #828282;
        font-style: normal;
        font-weight: normal;
        padding-bottom: 6px;
    }

    .datepicker-wrap {
        position: relative;
    }

    .datepicker-wrap>img {
        display: block;
        position: absolute;
        right: 5px;
        top: 10px;
        z-index: 1;
        width: 21px;
        height: 21px;
        pointer-events: none;
    }

    .vdp-datepicker__calendar-button {
        position: absolute;
        right: 0;
    }

    .vdp-datepicker .cell.day-header:last-child {
        color: red!important;
    }

    .vdp-datepicker__calendar .cell.day {
        border-radius: 50%;
    }

    .vdp-datepicker .cell.selected, .vdp-datepicker .cell:hover {
        background: #2196F3!important;
        color: #fff!important;
    }

    .vdp-datepicker:before {
        content: '';
        display: block;
        position: absolute;
        right: 10px;
        top: 15px;
        z-index: 1;
        width: 21px;
        height: 21px;
        background: url("/src/assets/img/icons/calendar.svg");
        pointer-events: none;

    }

    .vdp-datepicker:after {
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

    .vdp-datepicker__calendar {
        padding-bottom: 20px;
        padding-top: 20px;
    }

    .vdp-datepicker__calendar header,
    .vdp-datepicker__calendar header + div
    {
        max-width: 222px;
        margin: auto;
    }

    .vdp-datepicker__calendar .cell {
        height: 31.7px!important;
        line-height: 31.7px!important;
        font-size: 14px;
    }

</style>
