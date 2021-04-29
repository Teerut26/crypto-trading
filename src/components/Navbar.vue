<template>
    <div class="mb-3 ">
        <nprogress-container></nprogress-container>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#" @click="clickPage2('/')"><i class="fad fa-coins"></i> Visual Trading
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <!-- <b-nav-item v-if="$store.state.show_navbar" href="#"><i class="fad fa-money-bill-wave"></i> เงินของฉัน</b-nav-item> -->
                    <!-- Navbar dropdowns -->

                    <b-nav-item href="#" @click="clickPage2('/')" v-if="$store.state.show_navbar">
                        <i class="fad fa-home"></i> หน้าแรก
                    </b-nav-item>

                    <b-nav-item href="#" @click="clickPage2('/wallet')" v-if="$store.state.show_navbar">
                        <i class="fad fa-wallet"></i> กระเป๋าตัง
                    </b-nav-item>

                    <b-nav-item href="#" @click="clickPage2('/activity')" v-if="$store.state.show_navbar">
                        <i class="fad fa-list"></i> Activity
                    </b-nav-item>

                    <b-nav-item-dropdown v-if="$store.state.show_navbar" text="เลือกเหรียญ" style="">
                        <div class="ex4">
                            <b-dropdown-item v-for="item in key_crypto" :key="item"
                                @click="clickPage('/market/'+item,item,'thb_'+item.toLowerCase())"><img
                                    :src="'https://www.bitkub.com/static/images/icons/'+item+'.png'" width="20"
                                    height="20">
                                {{item}}
                            </b-dropdown-item>
                        </div>
                    </b-nav-item-dropdown>


                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-button v-if="$store.state.show_navbar" size="sm" class="my-2 mr-2 my-sm-0"><i
                                class="fad fa-user"></i> {{$store.state.username}}</b-button>
                    </b-nav-form>
                    <b-nav-form>
                        <b-button v-if="$store.state.show_navbar" @click="logOut" size="sm"
                            class="btn-danger my-2 my-sm-0" type="submit">Logout</b-button>
                    </b-nav-form>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    // import firebase from '../firebase.js'
    const axios = require('axios');
    import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
    export default {
        components: {
            NprogressContainer
        },
        data: () => ({
            connection: null,
            data: {},
            key_crypto: []
        }),
        methods: {
            getFirst() {
                var self = this;
                console.log(true)
                axios.get('https://www.bitkub.com/api/market/ticker')
                    .then(function (response) {
                        // console.log("🚀 ~ file: Navbar.vue ~ line 75 ~ response", response.data.data)
                        for (var key in self.$store.state.crypto_data) {
                            // console.log("🚀 ~ file: Navbar.vue ~ line 77 ~ key", key)
                            for (let key2 in response.data.data) {
                                if (key2.match(key)) {
                                    // console.log("🚀 ~ file: Navbar.vue ~ line 79 ~ key2", key2)
                                    self.$store.state.crypto_data[key] = response.data.data[key2]
                                    // console.log("🚀 ~ file: Navbar.vue ~ line 82 ~ key", key)

                                }
                            }

                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            clickPage(path, page, wssPath) {
                this.$store.state.current_page = page
                this.$store.state.current_wss_path = wssPath
                this.$router.push(path)
                // this.forceRerender() error
                this.forceRerender2()
            },
            clickPage2(path) {
                this.$router.push(path)
                this.forceRerender2()
            },
            // forceRerender() {
            //     // Remove my-component from the DOM
            //     this.$store.state.renderComponent = false;

            //     this.$nextTick(() => {
            //         // Add the component back in
            //         this.$store.state.renderComponent = true;
            //     });
            // },
            forceRerender2() {
                this.$store.state.componentKey += 1;
            },
            logOut() {
                localStorage.removeItem("username")
                localStorage.removeItem("token")
                // this.$router.push('/login');
            },
        },
        mounted() {

            for (var key in this.$store.state.crypto_data) {
                this.key_crypto.push(key)
            }

            if (localStorage.getItem("token") != null & localStorage.getItem("username") != null) {
                this.$store.state.show_navbar = true
            }

            // console.log('asdasdasdasd')
            // firebase.database().ref('chart_config').on('value', (snapshot) => {
            //     console.log(snapshot.value())
            // })

        },
        created: function () {
            this.getFirst()
            console.log("Starting connection to WebSocket Server")

            this.connection = new WebSocket(
                "wss://www.bitkub.com/websocket-market-api/subscribe/ticker"
            )

            var self = this

            this.connection.onmessage = function (event) {
                let stream_wss = JSON.parse(event.data).data
                // console.log("🚀 ~ file: Navbar.vue ~ line 151 ~ stream_wss", stream_wss)
                // console.log("🚀 ~ file: Navbar.vue ~ line 151 ~ stream_wss", stream_wss)
                
                for (let index = 0; index < self.key_crypto.length; index++) {
                    if (stream_wss.stream == 'market.ticker.thb_' + self.key_crypto[index].toLowerCase()) {
                        self.$store.state.crypto_data[self.key_crypto[index]] = stream_wss
                        // console.log(self.$store.state.crypto_data[self.key_crypto[index]])
                        // console.log("🚀 ~ file: Navbar.vue ~ line 156 ~ self.$store.state.crypto_data[self.key_crypto[index]]", self.$store.state.crypto_data[self.key_crypto[index]])
                        // console.log("🚀 ~ file: Navbar.vue ~ line 156 ~ stream_wss", stream_wss)
                    }

                }
            }

            this.connection.onopen = function () {
                // console.log(event)
                console.log("Successfully connected to the echo websocket server...")
            }

        }
    }
</script>

<style>
    /* #nprogress .bar {
background: red !important;
width: 10px;
} */
    #nprogress .bar {
        background: #FFBB00 !important;
        height: 2px;
    }

    #nprogress .peg {
        box-shadow: 0 0 30px #FFBB00, 0 0 30px #FFBB00;
    }

    #nprogress .spinner-icon {
        border-top-color: #FFBB00;
        border-left-color: #FFBB00;
    }
</style>