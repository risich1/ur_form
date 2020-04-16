<script>
    import Header from '@/components/UI/Header';
    import Footer from '@/components/UI/Footer';
    import TextField from '@/components/Fields/TextField';
    import DateField from '@/components/Fields/DateField';
    import SelectField from '@/components/Fields/SelectField';
    import Slick from 'vue-slick-carousel'
    import 'vue-slick-carousel/dist/vue-slick-carousel.css'
    import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

    export default {
        components: {Header, Footer, TextField, DateField, SelectField, Slick},
        data()
        {

            return {
                agree: false,
                activeStep: 1,
                formData: {
                    price: {
                        type: 'number',
                        name: 'price',
                        label: 'Цена',
                        show: true,
                        value: null,
                        size: 'big',
                        error: false,
                        required: true,
                        errorMessage: 'Укажите цену'
                    },
                    category: {
                        type: 'select',
                        name: 'category',
                        label: 'Категория покупки',
                        show: true,
                        placeholder: 'Выберите категорию',
                        required: true,
                        errorMessage: 'Выберите категорию покупки',
                        value: '',
                        options: [
                            {name: 'Выберите категорию', value: ''},
                            {name: 'Продукты питания', value: 'Продукты питания'},
                            {name: 'Сложные товары (техника, электроника)', value: 'Сложные товары (техника, электроника)'},
                            {name: 'Услуги или нематериальные товары', value: 'Услуги или нематериальные товары'},
                            {name: 'Ни одна из перечисленных', value: 'Ни одна из перечисленных'}
                        ]
                    },
                    date: {
                        type: 'date',
                        name: 'date',
                        label: 'Дата',
                        size: 'big',
                        required: true,
                        errorMessage: 'Укажите дату',
                        value:  null
                    }

                }
            }
        },
        methods: {
            changeTextField(name, value)
            {
                const step = this.formData;
                const field = step[name];

                field.value = value;

                if(field.dependFields)
                {
                    field.dependFields.forEach(item => {
                        step[item].show = !!field.value
                    });
                }

            },
            toForm(e)
            {
                e.preventDefault();

                if(this.validateFields())
                {

                    const pushData = {
                        path: 'form',
                        query: {
                            date: this.formData.date.value.split('.').reverse().join('.'),
                            price: this.formData.price.value,
                            category: this.formData.category.value
                        }
                    };

                    this.$router.push(pushData);
                }

            },
            validateFields()
            {
                let valid = true;
                Object.values(this.formData).forEach((field) => {

                    if(field.required && !field.value)
                    {
                        valid = false;

                        this.formData[field.name].error = true;
                        this.$toasted.error(field.errorMessage, {duration: 3000});
                    } else {
                        this.formData[field.name].error = false;
                    }
                });

                if(!this.agree)
                {
                    this.$toasted.error("Вы не поставили согласие на обработку данных", {duration: 3000});
                    valid = false;
                }

                return valid;
            },
        }

    }
</script>

<template>
    <div id="home">
        <Header></Header>

        <main>
            <div class="container">
                <div class="panel">
                    <div class="head">
                        Вы приобрели некачественный товар или  услугу <br>
                        и вы хотите вернуть свои деньги?  Воспользуйтесь бесплатным <br> сервисом Потреб.Про!
                    </div>
                    <div class="body">
                        <form @submit="toForm">

                            <div :key="key" v-for="(field, key) in formData">
                                <TextField v-if="field.type === 'text' || field.type === 'textarea' || field.type === 'number'" @change-field="changeTextField" v-bind:data="field"></TextField>
                                <SelectField v-if="field.type === 'select'" @change-field="changeTextField" v-bind:data="field"></SelectField>
                                <DateField v-if="field.type === 'date'" @change-field="changeTextField" v-bind:data="field"></DateField>
                            </div>




                            <div class="form-footer">
                                <div class=" custom-control custom-checkbox group-checkbox">
                                    <input v-model="agree" type="checkbox" class="custom-control-input" id="agree">
                                    <label class="custom-control-label" for="agree">Нажимая “Рассчитать компенсацию”, Вы даете согласие на обработку ваших персональных данных, согласно условиям Пользовательского соглашения и Политики конфиденциальности
                                    </label>
                                </div>

                                <button class="big-btn">рассчитать компенсацию</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="section pb0 pt0">
                    <h2>Как это работает</h2>
                    <div class="row between">
                        <div class="work-item">
                            <img src="@/assets/img/icon1.svg" alt="">
                            <div class="arr">
                                <img src="@/assets/img/arr.svg" alt="">
                            </div>
                            <h3>Шаг 1</h3>
                            <p>
                                Вы заполняете
                                основную информацию
                                о покупке (дата, категория, цена)
                            </p>
                        </div>
                        <div class="work-item">
                            <img src="@/assets/img/icon2.svg" alt="">

                            <div class="arr">
                                <img src="@/assets/img/arr.svg" alt="">
                            </div>

                            <h3>Шаг 2</h3>
                            <p>
                                Уточняете дополнительную
                                информацию: гарантия,  фото дефектов, требования
                            </p>
                        </div>
                        <div class="work-item">
                            <img src="@/assets/img/icon4.svg" alt="">
                            <div class="arr">
                                <img src="@/assets/img/arr.svg" alt="">
                            </div>
                            <h3>Шаг 3</h3>
                            <p>
                                Вводите свою контактную информацию
                            </p>
                        </div>
                        <div class="work-item">
                            <img src="@/assets/img/icon3.svg" alt="">

                            <h3>Шаг 4</h3>
                            <p>
                                Претензия отправлена!
                            </p>
                        </div>
                        <div class="flex-center-wrap mt30">
                            <a href="/#home" class="big-btn">рассчитать компенсацию</a>
                        </div>
                    </div>
                </div>

                <div class="section pb0" id="testimonials">
                    <h2>Отзывы</h2>

                    <Slick ref="slick" :arrows="true" :dots="true" class="slider">
                        <div class="slide">
                            <div class="text">
                                <p>
                                    “Купил iphone x. Спустя неделю я заетил что телефон стал выключаться сам по себе. Нашел этот сайт и быстро заполнил заявку.  Через две недели мне на почту пришло сообщение что я могу вернуть деньги!  Деньги я вернул! Огромное спасибо что стоите на страже!”
                                </p>
                            </div>
                            <div class="avatar">
                                <img src="@/assets/img/avatar.svg" alt=".">
                            </div>
                            <h3 class="name">Константин Иванов</h3>
                        </div>

                        <div class="slide">
                            <div class="text">
                                <p>
                                    “Купил iphone x. Спустя неделю я заетил что телефон стал выключаться сам по себе. Нашел этот сайт и быстро заполнил заявку.  Через две недели мне на почту пришло сообщение что я могу вернуть деньги!  Деньги я вернул! Огромное спасибо что стоите на страже!”
                                </p>
                            </div>
                            <div class="avatar">
                                <img src="@/assets/img/avatar.svg" alt=".">
                            </div>
                            <h3 class="name">Константин Иванов</h3>
                        </div>
                    </Slick>

                    <div class="row center">
                        <a href="/#home" class="big-btn">рассчитать компенсацию</a>
                    </div>
                </div>

                <div class="section" id="telegram">
                    <h2>Telegram-версия</h2>
                    <div class="row text-image">
                        <img src="@/assets/img/telegram.svg" alt=".">
                        <p>
                            Также у нас имеется telegram-версия нашего сервиса с аналогичным функционалом. Если Вам удобнее подать претензию через мессенджер - воспользуйтесь telegram-ботом
                        </p>
                    </div>
                </div>
            </div>
        </main>

        <Footer></Footer>
    </div>
</template>

