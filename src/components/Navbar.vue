<template>
    <div class="mb-3">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#"><i class="fad fa-coins"></i> Visual Trading</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <!-- <b-nav-item v-if="$store.state.show_navbar" href="#"><i class="fad fa-money-bill-wave"></i> เงินของฉัน</b-nav-item> -->
                    <!-- Navbar dropdowns -->

                    <b-nav-item-dropdown v-if="$store.state.show_navbar" text="เลือกเหรียญ" style="">
                        <b-dropdown-item @click="clickPage('/market/BTC','BTC','thb_btc')"><img
                                src="../assets/crpyto/BTC.png" width="20" height="20"> BTC
                        </b-dropdown-item>
                        <b-dropdown-item @click="clickPage('/market/ETH','ETH','thb_eth')"><img
                                src="../assets/crpyto/ETH.png" width="20" height="20"> ETH
                        </b-dropdown-item>
                        <b-dropdown-item @click="clickPage('/market/XRP','XRP','thb_xrp')"><img
                                src="../assets/crpyto/XRP.png" width="20" height="20"> XRP
                        </b-dropdown-item>
                        <b-dropdown-item @click="clickPage('/market/BNB','BNB','thb_bnb')"><img
                                src="../assets/crpyto/BNB.png" width="20" height="20"> BNB
                        </b-dropdown-item>
                        <b-dropdown-item @click="clickPage('/market/DOGE','DOGE','thb_doge')"><img
                                src="../assets/crpyto/DOGE.png" width="20" height="20"> DOGE
                        </b-dropdown-item>
                        <b-dropdown-item @click="clickPage('/market/USDT','USDT','thb_usdt')"><img
                                src="../assets/crpyto/USDT.png" width="20" height="20"> USDT
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-button v-if="$store.state.show_navbar" size="sm" class="my-2 mr-2 my-sm-0"><i
                                class="fad fa-user"></i> {{$store.state.username}}</b-button>
                    </b-nav-form>
                    <b-nav-form>
                        <b-button v-if="$store.state.show_navbar" @click="logOut" size="sm" class="my-2 my-sm-0"
                            type="submit">Logout</b-button>
                    </b-nav-form>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    // import firebase from '../firebase.js'
    export default {
        data: () => ({
            connection: null,
            data: {}
        }),
        methods: {
            clickPage(path, page, wssPath) {
                this.$store.state.current_page = page
                this.$store.state.current_wss_path = wssPath
                this.$router.push(path)
                this.forceRerender()
            },
            forceRerender() {
                // Remove my-component from the DOM
                this.$store.state.renderComponent = false;

                this.$nextTick(() => {
                    // Add the component back in
                    this.$store.state.renderComponent = true;
                });
            },
            logOut() {
                localStorage.removeItem("username")
                localStorage.removeItem("token")
                // this.$router.push('/login');
            },
        },
        mounted() {

            if (localStorage.getItem("token") != null & localStorage.getItem("username") != null) {
                this.$store.state.show_navbar = true
            }

            // console.log('asdasdasdasd')
            // firebase.database().ref('chart_config').on('value', (snapshot) => {
            //     console.log(snapshot.value())
            // })

        },
        created: function () {
            console.log("Starting connection to WebSocket Server")

            this.connection = new WebSocket(
                "wss://api.bitkub.com/websocket-api/market.ticker.thb_btc,market.ticker.thb_eth,market.ticker.thb_xrp,market.ticker.thb_bnb,market.ticker.thb_doge,market.ticker.thb_usdt"
            )

            var self = this

            this.connection.onmessage = function (event) {
                let stream_wss = JSON.parse(event.data)
                // console.log(stream_wss)
                if (stream_wss.stream == 'market.ticker.thb_btc') {
                    self.$store.state.crypto_data.BTC = stream_wss
                } else if (stream_wss.stream == 'market.ticker.thb_eth') {
                    self.$store.state.crypto_data.ETH = stream_wss
                } else if (stream_wss.stream == 'market.ticker.thb_xrp') {
                    self.$store.state.crypto_data.XRP = stream_wss
                } else if (stream_wss.stream == 'market.ticker.thb_bnb') {
                    self.$store.state.crypto_data.BNB = stream_wss
                } else if (stream_wss.stream == 'market.ticker.thb_doge') {
                    self.$store.state.crypto_data.DOGE = stream_wss
                } else if (stream_wss.stream == 'market.ticker.thb_usdt') {
                    self.$store.state.crypto_data.USDT = stream_wss
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

</style>