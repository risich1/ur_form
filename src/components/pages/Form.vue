<template>
    <div id="form">
        <Header></Header>
        <div style="margin-top: 20px" class="container form-content">

            <div v-if="preloader" class="preloader">
                Загрузка
            </div>
            <div v-show="activeStep===1" class="step-1">
                <h2 class="step-title">Шаг 2 - заполнение информации о покупке</h2>

                <div :key="key" v-for="(field, key) in formData[0]">
                    <TextField v-if="field.type === 'text' || field.type === 'textarea' || field.type === 'number'" @change-field="changeTextField" v-bind:data="field"></TextField>
                    <SelectField v-if="field.type === 'select'" @change-field="changeTextField" v-bind:data="field"></SelectField>
                    <Switcher v-if="field.type === 'switch'" @change-field="changeTextField" v-bind:data="field"></Switcher>
                    <DateField v-if="field.type === 'date'" @change-field="changeTextField" v-bind:data="field"></DateField>
                    <loadFiles v-if="field.type === 'multiFile'" v-bind:data="field" @remove-file="removeFile" @load-files="field.change"/>
                    <loadFiles v-if="field.type === 'file'" v-bind:data="field" @remove-file="removeFile" @load-files="field.change"/>
                </div>

            </div>
            <div v-show="activeStep===2" class="step-2">
                <h2 class="step-title">Шаг 3 - заполнение контактных данных</h2>
                <div :key="key" v-for="(field, key) in formData[1]">
                    <TextField v-if="field.type === 'text'" @change-field="changeTextField" v-bind:data="field"></TextField>
                    <SelectField v-if="field.type === 'select'" @change-field="changeTextField" v-bind:data="field"></SelectField>
                    <Switcher v-if="field.type === 'switch'" @change-field="changeTextField" v-bind:data="field"></Switcher>
                    <DateField v-if="field.type === 'date'" @change-field="changeTextField" v-bind:data="field"></DateField>
                    <loadFiles v-if="field.type === 'multiFile'" v-bind:data="field" @remove-file="removeFile" @load-files="field.change"/>
                    <loadFiles v-if="field.type === 'file'" v-bind:data="field" @remove-file="removeFile" @load-files="field.change"/>
                </div>
            </div>

            <div v-if="activeStep === steps" class="step-3">
                <h2 class="step-title">Шаг 4 - сверка и отправка претензии</h2>
                <FetchTable v-bind:formData="formData"/>

                <div class="container-small">
                    <Signature @save-signature="saveSignature" v-bind:saveSignature="saveSignatureP"></Signature>
                    <div class=" custom-control custom-checkbox">
                        <input v-model="agree" type="checkbox" class="custom-control-input" id="agree">
                        <label class="custom-control-label" for="agree">нажимая “отправить претензию”, Вы даете согласие на  оказание услуг в соответствии с Пользовательскимм соглашением.</label>
                    </div>
                </div>
            </div>

            <Success v-if="sendForm" @click-btn="showDeal"></Success>
            <Terms v-if="deal"></Terms>


            <div :class="{
                'nav-btns': true,
                'container-ext-small': activeStep < steps
            }">
                <button v-if="activeStep > 1" @click="prevStep" class="btn btn-primary btn-back">Назад</button>
                <button :disabled="!activeNextButton" v-if="activeStep < steps && activeStep > 0" @click="nextStep" class="btn btn-primary btn-next">{{ !activeNextButton ? 'Ждемс' : 'Далее'}} </button>
                <button v-if="activeStep === steps"  @click="sendData" class="btn btn-primary btn-next">Отправить заявку</button>
            </div>

        </div>

        <div v-if="!sendForm && !deal" class="container">
            <div class="nav-steps">
                <ul>
                    <li :class="{active: activeStep >= 1}">
                        <div class="circle">шаг 1</div>
                        <span>
                            базовая <br> информация о покупке
                        </span>
                    </li>
                    <li :class="{active: activeStep >= 1}">
                        <div class="circle">шаг 2</div>
                        <span>
                            детальная <br> информация  о покупке
                        </span>
                    </li>
                    <li :class="{active: activeStep >= 2}">
                        <div class="circle">шаг 3</div>
                        <span>
                            контактная <br> информации
                        </span>
                    </li>
                    <li :class="{active: activeStep >= 3}">
                        <div class="circle">шаг 4</div>
                        <span>
                            отправка <br> заявки
                        </span>
                    </li>
                </ul>
            </div>
        </div>

        <FooterSmall></FooterSmall>
    </div>
</template>

<style>
    .nav-steps {
        margin-top: 60px;
        margin-bottom: 60px;
    }

    .nav-steps ul {
        display: flex;
        justify-content: space-between;
        position: relative;
    }

    .nav-steps ul:before
    {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        position: absolute;
        left: 0;
        top: 25px;
        z-index: 0;
        background: #BDBDBD;
    }

    .nav-steps li {

    }

    .nav-steps li:nth-child(3) {
        margin-right: 52px;
    }

    .nav-steps li .circle {
        width: 52px;
        height: 52px;
        background: #E0E0E0;
        color: #141212;
        text-align: center;
        border-radius: 50%;
        line-height: 52px;
        font-size: 13px;
        position: relative;
        z-index: 1;
        margin-bottom: 5px;
    }

    .nav-steps li.active .circle
    {
        background: #5283FF;
        color: #ffffff;
    }

    .nav-steps li:last-child .circle
    {
        margin-left: 10px;
    }

    #form {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

</style>

<script>

    import '@/assets/css/main.css';
    import Vue from 'vue';
    import Data from '@/include/Data.js';
    import qs from 'qs';

    import loadFiles from '@/components/Fields/loadFiles';
    import FetchTable from '@/components/FetchTable';
    import Switcher from '@/components/Fields/Switcher';
    import TextField from '@/components/Fields/TextField';
    import DateField from '@/components/Fields/DateField';
    import SelectField from '@/components/Fields/SelectField';
    import Signature from '@/components/Signature';
    import Toasted from 'vue-toasted';
    import axios from 'axios';
    import Header from '@/components/UI/Header';
    import FooterSmall from '@/components/UI/FooterSmall';
    import Terms from "../Terms";
    import Success from "../Success";
    Vue.use(Toasted, axios);


    export default {
        name: 'App',
        props: ['price', 'date', 'category'],
        components: {
            loadFiles,
            FetchTable,
            Switcher,
            TextField,
            DateField,
            SelectField,
            Signature,
            Header,
            FooterSmall,
            Terms,
            Success
        },

        mixins: [Data],

        beforeMount()
        {
            this.formData[0].totalPrice.value = Number(this.price) + Number(this.price / 100 * 10);
            this.formData[0].date.value = this.date;

            this.formData[0].price.value = this.price;
            this.formData[0].category.value = this.category;
        },

        data() {
            return {
                info: null,
                steps: 3,
                activeStep: 1,
                sendForm: false,
                deal: false,
                agree: false,
                loadedSeller: null,
                preloader: false,
                saveSignatureP: false,
                loadedSellerInfo: false,
                activeNextButton: true,
                case_id: null,
                sendedSteps: 0
            }
        },

        methods: {
            showDeal()
            {
                this.deal = true;
                this.sendForm = false;
            },

            saveSignature(data)
            {
                this.signature = data;
            },

            validateRegex(field)
            {
                let reg = '';
                if(field.validate === 'email')
                {
                    reg = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,10})+$/;
                }

                return reg.test(String(field.value).toLowerCase());
            },



            sendData()
            {
                this.saveSignatureP = true;

                setTimeout(async () => {
                    if(!this.signature || !this.agree)
                    {
                        if(!this.signature)
                        {
                            this.$toasted.error('Вы не  подтвердили подпись', {duration: 3000});
                        }

                        if(!this.agree)
                        {
                            this.$toasted.error('Вы не отметили согласие на обработку данных', {duration: 3000});
                        }
                    } else {
                        const data = new FormData;
                        // const file = new File([this.signature], "signature.png", {
                        //     type: 'image/png'
                        // });

                        const photos = this.formData[0].photos.value;

                        console.log(photos);

                        if(photos)
                        {
                            photos.forEach(file => {
                                data.append('photos[]', file);
                            })
                        }

                        if(this.check)
                        {
                            data.append('check', this.check);
                        }

                        data.append('case_id', this.case_id);

                        data.append('signature', this.signature);
                        await axios
                            .post('http://www.legaltechbot.by/api/savesign', data,   {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                            .then(function (response) {
                                return response;
                            });

                        this.activeStep = 0;
                        this.sendForm = true;

                    }


                    this.saveSignatureP = false;
                }, 100)

            },


            changeTextField(name, value)
            {
                const step = this.formData[this.activeStep - 1];
                const field = step[name];

                field.value = value;

                if(field.name === 'unp')
                {
                    this.loadSellerInfoByUnp(value);
                }

                if(field.name === 'price')
                {
                    this.formData[this.activeStep - 1].totalPrice.value = Number(field.value) + Number(field.value / 100 * 10);
                }

                if(field.dependFields)
                {
                    field.dependFields.forEach(item => {


                        if(item === 'unp')
                        {
                            step[item].show = !field.value
                            step[item].required = !!field.value
                            step[item].error = false;
                        } else {
                            step[item].show = !!field.value
                        }

                    });
                }

            },

            async loadSellerInfoByUnp(unp)
            {
                if(unp.length === 9)
                {
                    if(!unp) return;

                    const data = qs.stringify({unp: unp});
                    // this.preloader = true;

                    let toast = this.$toasted.show('Ищем мнформацию о продавце');
                    this.activeNextButton = false;
                    const result = await axios
                        .post('http://www.legaltechbot.by/api/unp', data,   {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                            }
                        })
                        .then(function (response) {
                            return response;
                        });

                    toast.goAway();

                    this.activeNextButton = true;

                    if(result.data.cp)
                    {
                        this.formData[0].sellerName.show = true;
                        this.formData[0].sellerName.value = result.data.cp.name;
                        this.formData[0].unp.error = false;
                        this.formData[0].unp.show = true;
                        this.loadedSellerInfo = true;
                        this.$toasted.success('Информация о продавце загружена', {duration: 3000});
                    } else {
                        this.$toasted.error('Информация о продавце не найдена', {duration: 3000});
                    }
                }
            },

            async loadSellerInfo(files, name)
            {

                if(files)
                {
                    this.formData[0][name].value = files[0];

                    const formData = new FormData();
                    formData.append('cheque', files[0]);


                    this.check = files[0];
                    let toast = this.$toasted.show('Идет распознание');
                    this.activeNextButton = false;
                    let result = await axios
                        .post('http://www.legaltechbot.by/api/cheque', formData,   {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(function (response) {
                            return response;
                        });

                    toast.goAway();
                    this.activeNextButton = true;
                    this.formData[0].unp.show = true;

                    if(result.data)
                    {
                        if(result.data.cp)
                        {
                            this.formData[0].unp.value = result.data.cp.unp;
                            this.formData[0].sellerName.show = true;
                            this.formData[0].sellerName.value = result.data.cp.name;
                            this.formData[0].unp.error = false;
                            this.loadedSellerInfo = true;
                            this.$toasted.success('Информация о продавце загружена', {duration: 3000});
                        } else {
                            this.$toasted.error('Распознание не удалось. Попробуйте ввести унп вручную', {duration: 3000});
                        }
                    }

                }

            },
            prevStep()
            {
                if(this.activeStep > 1)
                {
                    this.activeStep = this.activeStep - 1;
                }
            },

            async sendStep()
            {
                let fields = this.formData[this.activeStep - 1];
                const resultData = new FormData;
                let url = 'step' + (this.activeStep + 1) + 'save';
                Object.keys(fields).forEach(key => {
                    if(fields[key].type !== 'file' && fields[key].type !== 'multiFile')
                    {
                        let value = fields[key].value;
                        if(fields[key].type === 'switch' || fields[key].type === 'checkbox')
                        {
                            value = fields[key].value ? 'да' : 'нет';
                        }

                        resultData.append(key, value);

                    }

                });
                resultData.append('case_id', this.case_id);

                this.activeNextButton = true;

                if(this.case_id && this.sendedSteps >= this.activeStep)
                {
                    url = 'step' + (this.activeStep + 1) + 'update';
                }

                let result = await axios
                    .post('http://www.legaltechbot.by/api/' + url, resultData,   {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(function (response) {
                        return response;
                    });


                if(result.data)
                {
                    this.case_id = result.data.case_id;
                    if(this.sendedSteps < this.activeStep) this.sendedSteps++;
                }

                this.activeNextButton = true;
            },



            async nextStep()
            {

                if(this.validateFields())
                {
                    await this.sendStep();
                    if(this.activeStep <= this.steps)
                    {
                        this.activeStep = this.activeStep + 1;
                    }
                }
            },

            validateFields()
            {
                let valid = true;
                Object.values(this.formData[this.activeStep - 1]).forEach((field) => {

                    if(field.required && !field.value)
                    {
                        valid = false;

                        this.formData[this.activeStep - 1][field.name].error = true;
                        this.$toasted.error(field.errorMessage, {duration: 3000});
                    } else if(field.value && field.validate && !this.validateRegex(field))
                    {
                        this.$toasted.error(`Укажите ${field.name} в правильном формате`, {duration: 3000});
                        this.formData[this.activeStep - 1][field.name].error = true;
                        valid = false;
                    }
                    else {
                        this.formData[this.activeStep - 1][field.name].error = false;
                    }
                });

                if(this.formData[0].is_cheque.value && !this.loadedSellerInfo && this.formData[0].unp.value)
                {
                    this.$toasted.error('Введите действительный унп', {duration: 2000});
                    valid = false;
                }

                return valid;
            },

            removeFile(i, name) {
                if(this.formData[this.activeStep - 1][name].value.length > 0)
                {
                    this.formData[this.activeStep - 1][name].value.splice(i, 1);
                }

            },

            loadFiles(files, name) {

                files = Object.values(files);

                for(let i = 0; i < files.length; i++)
                {
                    this.formData[this.activeStep - 1][name].value.push(files[i]);
                    console.log(files[i].type);
                }

            }
        }
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

    /*.nav-btns {*/
    /*    max-width: 500px;*/
    /*}*/

    .btn-next {
        margin-left: auto;
        background: #5283FF;
        border: 1px solid rgba(31, 32, 65, 0.25);
        min-width: 124px;
        font-size: 22px;
    }

    .btn-back {
        background: #EBE9E9;
        border: 1px solid rgba(31, 32, 65, 0.25);
        min-width: 124px;
        font-size: 22px;
        color: #828282;
    }

    .btn-back:hover {
        background: #A0A0A0;
        border: 1px solid rgba(31, 32, 65, 0.25);
    }

    .container-small {
        max-width: 630px;
        margin: auto;
    }

    .deal .text {
        max-height: 70vh;
        overflow: auto;
        margin-bottom: 60px;
    }

    .deal .text::-webkit-scrollbar
    {
        display: none;
    }
</style>
