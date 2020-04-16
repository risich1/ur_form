<template>
        <div class="signature">
            <label>Ваша цифровая подпись</label>
            <div class="row">
                <div class="col-12 mt-2">
                    <div class="signature-wrapper">
<!--                            <button class="change" @click="save">Подтвердить</button>-->
                            <button class="undo" @click="undo">Очистить</button>
                        <VueSignaturePad
                                id="signature"
                                width="60%"
                                height="300px"
                                @click="save"
                                ref="signaturePad"
                                :options="options"
                        />
                    </div>
                </div>
            </div>
        </div>

</template>

<script>
    import VueSignaturePad from 'vue-signature-pad';

    export default {
        name: "Signature",
        props: ['saveSignature'],
        data: () => ({
            signature: null,
            sSignature: false,
            options: {
                penColor: "#012D78",
                backgroundColor: 'transparent',
                customStyle: {background: 'transparent'}
            }
        }),

        watch: {
            saveSignature() {
               if(this.saveSignature) this.save();
            }
        },
        components: {VueSignaturePad},
        methods: {
            undo() {
                this.$refs.signaturePad.undoSignature();
                this.save(true);
            },
            change() {

            },
            save(clear = false) {
                const {data} = this.$refs.signaturePad.saveSignature();
                if(clear === true)
                {
                    this.$emit('save-signature', data);

                } else {
                    if(data)
                    {
                        this.$emit('save-signature', data);
                        this.signature = data;
                    }
                }


            }
        }
    };
</script>

<style scoped>

    label {
        font-size: 22px;
    }

    .signature-wrapper {
        background: #F2F2F2;
        padding-bottom: 50px;
        padding-top: 50px;
        position: relative;
        margin-bottom: 20px;
    }

    .signature-wrapper button {
        background: 0;
        border: 0;
        font-size: 21px;
        color: #4985ff;
        position: absolute;
        top: 10px;
        outline: none;
    }

    .signature-wrapper button.change {
        left: 10px;
    }

    .signature-wrapper button.undo {
        right: 10px;
    }

    #signature {
        border: 0;
        border-bottom: 1px solid #C4C4C4;
        margin: auto;
        background-color: transparent!important;
    }

</style>
