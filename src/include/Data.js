
export default {
    components: {},
    data() {
        return {
            formData: [
                {
                    totalPrice: {
                        type: 'number',
                        name: 'totalPrice',
                        size: 'big',
                        label: 'Общая компенсация',
                        show: true,
                        value: '',
                        disabled: true,
                        error: false,
                        required: true,
                        errorMessage: 'Укажите компенсацию',
                        help: 'Размер компенсации рассчитывается примерно исходя из наличия права потребителя на взыскание неустойки за нарушение его законных требований, а также взыскание материальной компенсации причиненного морального вреда. Размер компенсации не гаранитируется ко взысканию'
                    },
                    date: {
                        type: 'date',
                        name: 'date',
                        size: 'big',
                        label: 'Дата',
                        required: true,
                        errorMessage: 'Укажите дату',
                        value:  null
                    },
                    category: {
                        type: 'select',
                        name: 'category',
                        size: 'big',
                        label: 'Категория покупки',
                        show: true,
                        placeholder: 'Выберите категорию',
                        value: null,
                        options: [
                            {name: 'Выберите категорию', value: ''},
                            {name: 'Продукты питания', value: 'Продукты питания'},
                            {name: 'Сложные товары (техника, электроника)', value: 'Сложные товары (техника, электроника)'},
                            {name: 'Услуги или нематериальные товары', value: 'Услуги или нематериальные товары'},
                            {name: 'Ни одна из перечисленных', value: 'Ни одна из перечисленных'}
                        ]
                    },
                    price: {
                        type: 'number',
                        name: 'price',
                        size: 'big',
                        label: 'Цена',
                        show: true,
                        value: 1200,
                        error: false,
                        required: true,
                        errorMessage: 'Укажите цену'
                    },
                    is_warranty: {
                        type: 'switch',
                        name: 'is_warranty',
                        show: true,
                        label: 'Предоставлена гарантия',
                        value: false
                    },
                    refusal: {
                        type: 'switch',
                        name: 'refusal',
                        show: true,
                        label: 'Есть письменный отказ',
                        value: false
                    },
                    is_cheque: {
                        type: 'switch',
                        name: 'is_cheque',
                        show: true,
                        label: 'Есть чек',
                        value: true,
                        dependFields: ['check', 'unp']
                    },
                    check: {
                        type: 'file',
                        name: 'check',
                        multiply: false,
                        show: true,
                        label: 'Загрузить чек',
                        change: this.loadSellerInfo,
                        value: []
                    },
                    unp: {
                        type: 'number',
                        name: 'unp',
                        label: 'УНП продавца/исполнителя',
                        size: 'small',
                        show: false,
                        required: true,
                        error: false,
                        errorMessage: 'Загрузите чек или Введите УНП продавца',
                        value: ''

                    },
                    sellerName: {
                        type: 'text',
                        name: 'sellerName',
                        label: 'Наименование продавца',
                        size: 'big',
                        noStyle: true,
                        disabled: true,
                        show: false,
                        value: ''
                    },
                    goods: {
                        type: 'text',
                        name: 'goods',
                        label: 'Товар (Вид, марка, модель)',
                        required: true,
                        error: false,
                        errorMessage: 'Введите наименование товара',
                        show: true,
                        value: ''
                    },
                    defects: {
                        type: 'textarea',
                        name: 'defects',
                        label: 'Описание дефектов',
                        required: true,
                        error: false,
                        errorMessage: 'Укажите описание дефектов',
                        show: true,
                        value: ''
                    },
                    photos: {
                        type: 'multiFile',
                        name: 'photos',
                        multiply: true,
                        label: 'Фото дефектов',
                        show: true,
                        change: this.loadFiles,
                        value: []
                    },
                },
                {
                    fio: {
                        type: 'text',
                        name: 'fio',
                        label: 'ФИО',
                        required: true,
                        size: 'big',
                        error: false,
                        errorMessage: 'Введите ваше ФИО',
                        show: true,
                        value: ''
                    },
                    addres: {
                        type: 'text',
                        name: 'addres',
                        label: 'Адрес',
                        required: true,
                        size: 'big',
                        error: false,
                        errorMessage: 'Введите ваш адрес',
                        show: true,
                        value: ''
                    },
                    email: {
                        type: 'text',
                        validate: 'email',
                        name: 'email',
                        size: 'big',
                        label: 'Email',
                        required: true,
                        error: false,
                        errorMessage: 'Введите ваш email',
                        show: true,
                        value: ''
                    },
                    phone: {
                        type: 'text',
                        mask: '+375 (99) 999-99-99',
                        minlength: 17,
                        name: 'phone',
                        size: 'big',
                        show: true,
                        required: true,
                        error: false,
                        errorMessage: 'Введите ваш телефон',
                        label: 'Номер телефона',
                        value: ''
                    }
                }

            ],
        }
    },

}