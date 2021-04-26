<template>
    <div class="container">
        <center>
            <b-card tag="article" class="mb-2 mt-5 bg-dark " style="color: white; max-width: 20rem;">
                <h3>สมัครสมาชิก</h3>
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    <b-form-group id="input-group-1" label-for="input-1">
                        <b-form-input id="input-1" v-model="form.email" type="email" placeholder="ที่อยู่อีเมล"
                            required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label-for="input-2">
                        <b-form-input id="input-2" type="text" v-model="form.username" placeholder="ชื่อผู้ใช้"
                            required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label-for="input-2">
                        <b-form-input id="input-2" type="password" v-model="form.password" placeholder="รหัสผ่าน"
                            required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label-for="input-2">
                        <b-form-input id="input-2" type="password" v-model="form.rePassword"
                            placeholder="ยืนยันรหัสผ่าน" required></b-form-input>
                    </b-form-group>

                    <!-- <b-form-group id="input-group-3" label="Food:" label-for="input-3">
                    <b-form-select id="input-3" v-model="form.food" :options="foods" required></b-form-select>
                </b-form-group>

                <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group v-model="form.checked" id="checkboxes-4" :aria-describedby="ariaDescribedby">
                        <b-form-checkbox value="me">Check me out</b-form-checkbox>
                        <b-form-checkbox value="that">Check that out</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group> -->
                    <!-- <vue-recaptcha sitekey="6Ld5WLYaAAAAAM94xCgfoQe92gHCbvIIHuDRPkVT">
                        <b-button type="submit" variant="primary">สมัครสมาชิก</b-button>
                    </vue-recaptcha> -->
                    <!-- <vue-recaptcha ref="recaptcha" @verify="onVerify"
                        sitekey="6LdTWrYaAAAAAM_bCzQPEPgBcqnLO3q_6zTb26WQ">
                        sdfsdfs
                    </vue-recaptcha> -->
                    <!-- <vue-grecaptcha v-bind:callback="callback"></vue-grecaptcha> -->
                    <b-button type="submit" variant="primary">สมัครสมาชิก</b-button>
                    <p class="mt-2">มีบัญชีอยู่แล้ว? <router-link to="/login">ล็อกอินที่นี่ </router-link>
                    </p>
                </b-form>
            </b-card>
        </center>
    </div>
</template>

<script>
    // import VueRecaptcha from 'vue-recaptcha';
    import firebase from '../firebase'
    import md5 from 'md5'
    const Swal = require('sweetalert2')

    export default {
        components: {
            // 'vue-recaptcha': VueRecaptcha
        },
        data() {
            return {
                form: {
                    username: "",
                    email: "",
                    password: "",
                    rePassword: ""
                },
                thisIP: "",
                show: true
            }
        },
        methods: {
            // callback: function (response) {
            //     console.log(response)
            // },
            onSubmit(event) {
                event.preventDefault()
                // alert(JSON.stringify(this.form))
                if (this.form.username != '' && this.form.email != '' && this.form.password != '' && this.form
                    .rePassword != '') {
                    if (this.form.password == this.form.rePassword) {
                        firebase.database().ref('users/' + this.form.username).once('value').then((snapshot) => {
                            if (snapshot.val() == null) {
                                firebase.database().ref('users/' + this.form.username).set({
                                    username: this.form.username,
                                    asset: {
                                        THB: {
                                            value: 50000000,
                                        },
                                    },
                                    email: this.form.email,
                                    password: md5(this.form.password),
                                    token: ""
                                });
                                console.log('SUCCESS')
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Success!',
                                    timer: 1300,
                                    text: 'สมัครสมาชิกสำเร็จ'
                                })
                                setTimeout(() => {
                                    this.$router.push('/login')
                                }, 1300);
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error!',
                                    timer: 1500,
                                    text: 'มีชื่อผู้ใช้นี้อยู่แล้ว',
                                })
                                this.form.username = ''
                                console.log('ชื่อผู้ใช้ซ้ำ')
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            timer: 1500,
                            text: 'รหัสผ่านไม่ตรงกัน',
                        })
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        timer: 1500,
                        text: 'ใส่ข้อมูลให้ครบก่อน',
                    })
                }
            },
            onReset(event) {
                event.preventDefault()
                // Reset our form values
                this.form.email = ''
                this.form.name = ''
                this.form.food = null
                this.form.checked = []
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>