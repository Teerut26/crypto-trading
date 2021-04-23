<template>
    <div class="container">
        <center>
            <b-card tag="article" class="mb-2 mt-5 bg-dark " style="color: white; max-width: 20rem;">
                <h3>เข้าสู่ระบบ</h3>
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    <b-form-group id="input-group-1" label-for="input-1">
                        <b-form-input id="input-1" v-model="form.username" type="text" placeholder="Username"
                            required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label-for="input-2">
                        <b-form-input id="input-2" type="password" v-model="form.password" placeholder="Password" required></b-form-input>
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

                    <b-button type="submit" variant="primary">เข้าสู่ระบบ</b-button>
                    <p class="mt-2">หากยังไม่มีบัญชี? <router-link to="/register">สมัครสมาชิกที่นี่</router-link></p>
                </b-form>
            </b-card>
        </center>
    </div>
</template>

<script>
    import firebase from '../firebase'
    import md5 from 'md5'
    import Axios from 'axios'
    const Swal = require('sweetalert2')
    export default {
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                },
                thisIP:'',
                show: true
            }
        },
        methods: {
            forceRerender() {
                // Remove my-component from the DOM
                this.$store.state.renderComponent = false;

                this.$nextTick(() => {
                    // Add the component back in
                    this.$store.state.renderComponent = true;
                });
            },
            onSubmit(event) {
                event.preventDefault()
                // alert(JSON.stringify(this.form))
                var now = new Date()
                if (this.form.username != '' && this.form.password != '') {
                    firebase.database().ref('users/' + this.form.username).once('value').then((snapshot) => {
                        if (snapshot.val() != null && snapshot.val().username != undefined) {
                            if (snapshot.val().password == md5(this.form.password)) {
                                const token = this.makeid(50)
                                firebase.database().ref('users/' + this.form.username).update({
                                    token: token
                                });
                                firebase.database().ref('users/' + this.form.username + '/loginLog/').once(
                                        'value')
                                    .then((snapshot) => {
                                        console.log(snapshot.numChildren());
                                        firebase.database().ref('users/' + this.form.username +
                                                '/loginLog/' +
                                                snapshot.numChildren())
                                            .set({
                                                IP: this.thisIP,
                                                timeStamp: now.toJSON()
                                            })
                                    });
                                // firebase.database().ref('users/' + this.form.username+'/loginLog/').push({
                                //     IP: this.thisIP,
                                //     timeStamp: now.toJSON()
                                // })
                                firebase.database().ref('users/' + this.form.username).once('value')
                                    .then((snapshot) => {
                                        this.$store.state.token = token
                                        this.$store.state.username = snapshot.val().username
                                        localStorage.setItem('username', snapshot.val().username)
                                        localStorage.setItem('token', token)
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Success!',
                                            timer: 1300,
                                            text: 'เข้าสู่ระบบสำเร็จ : ' + this.$store.state
                                                .username,
                                        })
                                        setTimeout(() => {
                                            this.$router.push('/market/BTC')
                                            this.$store.state.show_navbar = true
                                        }, 1300);
                                    });
                                console.log('SUCCESS')
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error!',
                                    timer: 1500,
                                    text: 'รหัสผ่านผิด',
                                })
                                console.log('รหัสผ่านผิด')
                            }
                            // console.log(snapshot.val().username)
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error!',
                                timer: 1500,
                                text: 'ไม่พบชื่อผู้ใช้นี้',
                            })
                            console.log('Not Found')
                        }
                        // var username = (snapshot.val());
                        // console.log(username)
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        timer: 1500,
                        text: 'ใส่ข้อมูลให้ครบก่อน',
                    })
                }
            },
            makeid(length) {
                var result = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            },
            getIP() {
                Axios.get('https://api64.ipify.org/?format=json').then((res) => {
                    this.thisIP = res.data.ip
                }).catch((err) => {
                    console.log(err)
                })
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
        },
        mounted() {
            this.getIP();
            
            // firebase.database().ref('users').on('value', ss => {
            //     console.log(ss.val())
            // })
            // สร้าง subscription สำหรับติดตามการเปลี่ยนแปลงของข้อมูล
            // this.dbRef.on('value', ss => {
            //     console.log(ss.val())
            // })
        },
    }
</script>