<template>
    <div class="container mt-3 white" v-if="$store.state.show_navbar">
        <b-card class="bg-dark">
            <h3><i class="fad fa-list"></i> Activity</h3>
            <b-list-group>
                <div style="height: calc(100vh - 173px);" class="ex4">
                    <b-list-group-item href="#" v-for="item in data_list" :key="item" class="white flex-column bg-dark align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">IP : {{item.IP}}</h5>
                </div>

                <p class="mb-1">
                    {{timeCover(item.timeStamp)}} ({{updateClock(item.timeStamp)}})
                </p>
            </b-list-group-item>
                </div>
            </b-list-group>
        </b-card>
    </div>

</template>

<script>
    import firebase from '../firebase.js'
    const Swal = require('sweetalert2')
    export default {
        name: 'HelloWorld',
        data() {
            return {
                data_list: []
            }
        },
        methods: {
            timeCover(time) {
                var now = new Date(time);
                return now.toLocaleString()
            },
            timePast(itme) {
                let past = new Date(itme);
                let now = new Date()
                let result = now.getTime() - past.getTime()
                return result
            },
            updateClock(time) {
                var newDate = new Date();
                var startStamp = new Date(time);
                var newStamp = newDate.getTime();
                var diff = Math.round((newStamp - startStamp.getTime()) / 1000);

                var d = Math.floor(diff / (24 * 60 *
                    60)); /* though I hope she won't be working for consecutive days :) */
                diff = diff - (d * 24 * 60 * 60);
                var h = Math.floor(diff / (60 * 60));
                diff = diff - (h * 60 * 60);
                var m = Math.floor(diff / (60));
                diff = diff - (m * 60);
                var s = diff;

                if (d > 0) {
                    return d + " วันที่ผ่านมา"
                } else if (d == 0 && h != 0 && m != 0 && s != 0) {
                    return h + " ชั่วโมงที่ผ่านมา"
                } else if (h == 0 && m != 0 && s != 0) {
                    return m + " นาทีที่ผ่านมา"
                } else if (m == 0 && s != 0) {
                    return s + " วินาทีที่ผ่านมา"
                }

                // return d + " day(s), " + h + " hour(s), " + m +
                //     " minute(s), " + s + " second(s) working";

            }
        },
        components: {},
        mounted() {
            this.$store.state.titleBar = "Log"
            var self = this;
            firebase.database().ref('users/' + localStorage.getItem("username") + '/loginLog/').on('value', (
                snapshot) => {
                // self.data_list = snapshot.val()
                // console.log(snapshot.val())
                var obj = []
                // for (let index = 0; index < snapshot.val().length; index++) {
                //     if (snapshot.val()[index].IP != '') {
                //         obj.push(snapshot.val()[index])
                //     }
                // }
                for (let index = snapshot.val().length; index > 0; index--) {
                    try {
                        if (snapshot.val()[index].IP != '') {
                            obj.push(snapshot.val()[index])
                        }
                    } catch {
                        continue;
                    }
                }
                self.data_list = obj
            })

            firebase.database().ref('users/' + localStorage.getItem("username")).on('value', (snapshot) => {
                if (snapshot.val() != null) {
                    if (localStorage.getItem("token") != null & localStorage.getItem("username") != null) {
                        if (localStorage.getItem("token") == snapshot.val().token) {
                            this.lists = snapshot.val().lists;
                            // console.log(true)
                            this.$store.state.email = snapshot.val().email;
                            this.$store.state.token = localStorage.getItem("token")
                            this.$store.state.username = localStorage.getItem("username")
                            this.$store.state.showPage = true
                            this.getLoginLog()
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error!',
                                text: 'มีการ Login จากที่อื่น',
                            }).then(() => {
                                localStorage.removeItem("username")
                                localStorage.removeItem("token")
                                this.$store.state.show_navbar = false
                                this.$router.push('/login')
                            })
                            // console.log(false)
                        }
                    } else {
                        this.$router.push('/login')
                    }
                } else {
                    this.$router.push('/login')
                }
            })
        },
    }
</script>
<style>
    .white {
        color: white;
    }

    .b-table-sticky-header {
        max-height: 500px;
    }

    .card-body {
        padding: 20px;
    }
</style>