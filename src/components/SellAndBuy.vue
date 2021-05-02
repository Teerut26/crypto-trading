<template>
    <div>
        <b-tabs  content-class="">
            <b-tab title="Limit" disabled>
                <b-card :title="'Buy '+$store.state.current_page" class="mb-3 bg-dark" style="color: white;">
                    <b-row>
                        <b-col class="col-sm float-left">ยอดคงเหลือ THB : </b-col>
                        <b-col class="col-sm float-right">
                            <nobr class="text-success">{{numberWithCommasC(this.data_thb.value,2)}}</nobr> THB
                        </b-col>
                    </b-row>
                    <hr>
                    <b-form-group>
                        <!-- <vue-numeric :precision="20" @keyup.enter="buy_crypto" class="form-control" placeholder="จำนวนทีต้องจ่าย THB" currency="THB" separator="," v-model="buy_value"></vue-numeric> -->
                        <b-form-text  class="mb-1">เงินที่ต้องการจ่าย THB</b-form-text>
                        <b-form-input lable="เงินที่ต้องการจ่าย THB" v-model="form_limit.buy.value" class="mb-1" type="number"
                            placeholder="เงินที่ต้องการจ่าย THB" required>
                        </b-form-input>
                        <b-form-text  class="mb-1">{{'ราคาซื้อ THB/'+$store.state.current_page}}</b-form-text>
                        <b-form-input v-model="form_limit.buy.price" class="mb-1"  type="number"
                            :placeholder="'ราคาซื้อ THB/'+$store.state.current_page" required>
                        </b-form-input>
                        <b-form-text v-model="sell_limit" class="mb-1">{{'เหรียญที่ได้รับ '+$store.state.current_page}}</b-form-text>
                        {{numberWithCommasC(form_limit.buy.value / form_limit.buy.price,8)}}
                        <!-- <b-form-input class="mb-1"  type="number" :value="numberWithCommasC(form_limit.buy.value / form_limit.buy.price,8)"
                            :placeholder="'เหรียญที่ได้รับ '+$store.state.current_page" required>
                        </b-form-input> -->
                    </b-form-group>
                    <b-form-group>
                        <b-button @click="buy_crypto_limit" block variant="success">ซื้อ {{$store.state.current_page}}
                        </b-button>
                    </b-form-group>
                </b-card>
                <b-card :title="'Sell '+$store.state.current_page" class="mb-2 bg-dark" style="color: white;">
                    <b-row>
                        <b-col class="col-sm float-left">ยอดคงเหลือ {{$store.state.current_page}} : </b-col>
                        <b-col class="col-sm float-right">
                            <nobr class="text-success">{{data_crypto.value}}</nobr>
                            {{$store.state.current_page}}
                        </b-col>
                    </b-row>
                    
                    <hr>
                    <b-form-group>
                        <!-- <vue-numeric :precision="20" @keyup.enter="buy_crypto" class="form-control" placeholder="จำนวนทีต้องจ่าย THB" currency="THB" separator="," v-model="buy_value"></vue-numeric> -->
                        <b-form-text  class="mb-1">{{'เหรียญที่ต้องการขาย '+$store.state.current_page}}</b-form-text>
                        <b-form-input v-model="form_limit.sell.value" class="mb-1" type="number"
                            :placeholder="'เหรียญที่ต้องการขาย '+$store.state.current_page" required>
                        </b-form-input>
                        <b-form-text  class="mb-1">{{'ราคาขาย THB/'+$store.state.current_page}}</b-form-text>
                        <b-form-input v-model="form_limit.sell.price" class="mb-1"  type="number"
                            :placeholder="'ราคาขาย THB/'+$store.state.current_page" required>
                        </b-form-input>
                        <b-form-text  class="mb-1">เงินที่ได้รับ THB</b-form-text>
                        {{numberWithCommasC(form_limit.sell.value * form_limit.sell.price,2)}}
                        <!-- <b-form-input class="mb-1"  type="number" :value="numberWithCommasC(form_limit.sell.value * form_limit.sell.price,1)"
                            placeholder="เงินที่ได้รับ THB" required>
                        </b-form-input> -->
                    </b-form-group>
                    <b-form-group>
                        <b-button block @click="sell_crypto_limit" variant="danger">ขาย {{$store.state.current_page}}
                        </b-button>
                    </b-form-group>
                </b-card>
                <OrderLimit />
            </b-tab>
            <b-tab title="Market" active>
                <b-card :title="'Buy '+$store.state.current_page" class="mb-3 bg-dark" style="color: white;">

                    <b-row>
                        <b-col class="col-sm float-left">ยอดคงเหลือ THB : </b-col>
                        <b-col class="col-sm float-right">
                            <nobr class="text-success">{{numberWithCommas(this.data_thb.value)}}</nobr> THB
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="col-sm float-left">เหรียญที่ได้ {{$store.state.current_page}} : </b-col>
                        <b-col class="col-sm float-right">
                            <nobr class="text-success">{{numberWithCommasC(check_value_buy(),8)}}</nobr> {{$store.state.current_page}}
                        </b-col>
                    </b-row>
                    <hr>
                    <b-form-group>
                        <!-- <vue-numeric :precision="20" @keyup.enter="buy_crypto" class="form-control" placeholder="จำนวนทีต้องจ่าย THB" currency="THB" separator="," v-model="buy_value"></vue-numeric> -->
                        <b-form-input @keyup.enter="buy_crypto" v-model="buy_value" type="number"
                            placeholder="จำนวนทีต้องจ่าย THB" required>
                        </b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-button @click="buy_crypto" block variant="success">ซื้อ {{$store.state.current_page}}
                        </b-button>
                    </b-form-group>
                </b-card>
                <b-card :title="'Sell '+$store.state.current_page" class="mb-2 bg-dark" style="color: white;">
                    <b-row>
                        <b-col class="col-sm float-left">ยอดคงเหลือ {{$store.state.current_page}} : </b-col>
                        <b-col class="col-sm float-right">
                            <nobr class="text-success">{{data_crypto.value}}</nobr>
                            {{$store.state.current_page}}
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="col-sm float-left">เหรียญที่ได้ THB : </b-col>
                        <b-col class="col-sm float-right">
                            <nobr class="text-success">{{numberWithCommas(check_value_sell())}}</nobr> THB
                        </b-col>
                    </b-row>
                    <hr>
                    <b-form-group>
                        <!-- <vue-numeric :precision="20"  @keyup.enter="sell_crypto" class="form-control" :placeholder="'จำนวนทีต้องจ่าย '+$store.state.current_page" :currency="$store.state.current_page" separator="," v-model="sell_value"></vue-numeric> -->
                        <b-form-input @keyup.enter="sell_crypto" v-model="sell_value" type="number"
                            :placeholder="'จำนวนทีต้องจ่าย '+$store.state.current_page" required></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-button block @click="sell_crypto" variant="danger">ขาย {{$store.state.current_page}}
                        </b-button>
                    </b-form-group>
                </b-card>
                <OrderMarket />
            </b-tab>
        </b-tabs>
    </div>

</template>

<script>
    import OrderLimit from '@/components/OrderLimit.vue'
    import OrderMarket from '@/components/OrderMarket.vue'

    import firebase from '../firebase.js'
    const Swal = require('sweetalert2')
    //   const Swal = require('sweetalert2')
    export default {
        name: 'HelloWorld',
        data() {
            return {
                form_limit:{
                    buy:{
                        value:null,
                        price:null,
                    },
                    sell:{
                        value:null,
                        price:null,
                    }
                },
                data_thb: {},
                data_crypto: {},
                buy_value: 0,
                sell_value: 0,
                data_chart: {}
            }
        },
        components: {
            OrderMarket,
            OrderLimit
        },
        methods: {
            numberWithCommas(x) {
                return parseFloat(x).toLocaleString()
            },
             numberWithCommasC(x, n) {
                var num2 = x.toFixed(n)
                var parts = num2.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return parts.join(".");
            },
            buy_crypto_limit(){
                var now = new Date()
                if (this.form_limit.buy.value > 0) {
                    if (this.form_limit.buy.value <= this.data_thb.value) {
                        var current_price = this.form_limit.buy.price

                        firebase.database().ref('users/' + localStorage.getItem("username") + '/asset/' + this.$store
                            .state
                            .current_page + '/order_limit').push({
                            order_type: "buy",
                            spent: this.form_limit.buy.value,
                            username: localStorage.getItem("username"),
                            asset: this.$store.state.current_page,
                            spent_show: this.numberWithCommas(this.form_limit.buy.value) + ' THB',
                            price: current_price,
                            price_show: this.numberWithCommas(current_price) + ' THB/' + this.$store.state
                                .current_page,
                            you_receiv: this.form_limit.buy.value / current_price,
                            you_receiv_show: this.numberWithCommas(this.form_limit.buy.value / current_price) + ' ' +
                                this.$store.state.current_page,
                            symbol: this.$store.state.current_page,
                            status: 'in_order',
                            timestamp: now.toJSON(),
                        });

                        firebase.database().ref('users/' + localStorage.getItem("username") + '/asset/THB').update({
                            value: this.data_thb.value - this.form_limit.buy.value
                        });

                        // firebase.database().ref('users/' + localStorage.getItem("username") + '/asset/' + this.$store
                        //     .state
                        //     .current_page).update({
                        //     value: this.data_crypto.value + this.form_limit.buy.value / current_price
                        // });


                        Swal.fire({
                            icon: 'success',
                            title: 'ซื้อ ' + this.$store.state.current_page,
                            // timer: 1300,
                            text: 'ที่ราคา : ' + this.numberWithCommas(current_price) + ' THB | จำนวน : ' + this.numberWithCommasC(this.form_limit.buy.value / current_price,8) + ' ' + this.$store.state
                                .current_page,
                        })

                        this.form_limit.buy.value = 0
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'ทำรายการไม่สำเร็จ',
                            timer: 1500,
                            text: 'THB ไม่พอ',
                        })
                    }
                }
            },
            buy_crypto() {
                var now = new Date()
                if (this.buy_value > 0) {
                    if (this.buy_value <= this.data_thb.value) {
                        var current_price = this.$store.state.crypto_data[this.$store.state.current_page].last

                        firebase.database().ref('users/' + localStorage.getItem("username") + '/asset/' + this.$store
                            .state
                            .current_page + '/order').push({
                            order_type: "buy",
                            spent: this.buy_value,
                            spent_show: this.numberWithCommas(this.buy_value) + ' THB',
                            price: current_price,
                            price_show: this.numberWithCommas(current_price) + ' THB/' + this.$store.state
                                .current_page,
                            you_received: this.buy_value / current_price,
                            you_received_show: this.numberWithCommas(this.buy_value / current_price) + ' ' +
                                this.$store.state.current_page,
                            symbol: this.$store.state.current_page,
                            timestamp: now.toJSON(),
                        });

                        firebase.database().ref('users/' + localStorage.getItem("username") + '/asset/THB').update({
                            value: this.data_thb.value - this.buy_value
                        });

                        firebase.database().ref('users/' + localStorage.getItem("username") + '/asset/' + this.$store
                            .state
                            .current_page).update({
                            value: this.data_crypto.value + this.buy_value / current_price
                        });


                        Swal.fire({
                            icon: 'success',
                            title: 'ซื้อ ' + this.$store.state.current_page + ' สำเร็จ',
                            // timer: 1300,
                            text: 'ที่ราคา : ' + this.numberWithCommas(current_price) + ' THB | จำนวน : ' + this
                                .buy_value / current_price + ' ' + this.$store.state
                                .current_page,
                        })

                        this.buy_value = 0
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'ทำรายการไม่สำเร็จ',
                            timer: 1500,
                            text: 'THB ไม่พอ',
                        })
                    }
                }
            },
            sell_crypto_limit(){
                var now = new Date()
                if (this.form_limit.sell.value > 0) {
                    if (this.form_limit.sell.value <= this.data_crypto.value) {
                        var current_price = this.form_limit.sell.price

                        firebase.database().ref('users/' + localStorage.getItem("username") + '/asset/' + this.$store.state.current_page + '/order_limit').push({
                            order_type: "sell",
                            spent: this.form_limit.sell.value,
                            username: localStorage.getItem("username"),
                            asset: this.$store.state.current_page,
                            spent_show: this.numberWithCommas(this.form_limit.sell.value) + ' ' + this.$store.state.current_page,
                            price: current_price,
                            price_show: this.numberWithCommas(current_price) + ' THB/' + this.$store.state
                                .current_page,
                            you_receiv: this.form_limit.sell.value / current_price,
                            you_receiv_show: this.numberWithCommas(this.form_limit.sell.value / current_price) + ' ' +
                                this.$store.state.current_page,
                            symbol: this.$store.state.current_page,
                            status: 'in_order',
                            timestamp: now.toJSON(),
                        });

                        // firebase.database().ref('users/' + localStorage.getItem("username") + '/asset/THB').update({
                        //     value: this.data_thb.value - this.form_limit.sell.value
                        // });

                        firebase.database().ref('users/' + localStorage.getItem("username") + '/asset/' + this.$store
                            .state
                            .current_page).update({
                            value: this.data_crypto.value - this.form_limit.sell.value
                        });


                        Swal.fire({
                            icon: 'success',
                            title: 'ซื้อ ' + this.$store.state.current_page,
                            // timer: 1300,
                            text: 'ที่ราคา : ' + this.numberWithCommas(current_price) + ' THB | จำนวน : ' + this.numberWithCommas(this.form_limit.sell.value / current_price) + ' ' + this.$store.state
                                .current_page,
                        })

                        this.form_limit.sell.value = 0
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'ทำรายการไม่สำเร็จ',
                            timer: 1500,
                            text: this.$store.state.current_page+' ไม่พอ',
                        })
                    }
                }
            },
            sell_crypto() {
                var now = new Date()
                if (this.sell_value > 0) {
                    if (this.sell_value <= this.data_crypto.value) {
                        var current_price = this.$store.state.crypto_data[this.$store.state.current_page].last

                        firebase.database().ref('users/' + localStorage.getItem("username") + '/asset/' + this.$store
                            .state
                            .current_page + '/order').push({
                            order_type: "sell",
                            spent: this.sell_value,
                            spent_show: this.numberWithCommas(this.sell_value) + ' ' + this.$store.state
                                .current_page,
                            price: current_price,
                            price_show: this.numberWithCommas(current_price) + ' THB/' + this.$store.state
                                .current_page,
                            you_received: this.sell_value * current_price,
                            you_received_show: this.numberWithCommas(this.sell_value * current_price) + ' THB',
                            symbol: this.$store.state.current_page,
                            timestamp: now.toJSON(),
                        });

                        firebase.database().ref('users/' + localStorage.getItem("username") + '/asset/THB').update({
                            value: this.data_thb.value + this.sell_value * current_price
                        });

                        firebase.database().ref('users/' + localStorage.getItem("username") + '/asset/' + this.$store
                            .state
                            .current_page).update({
                            value: this.data_crypto.value - this.sell_value
                        });


                        Swal.fire({
                            icon: 'success',
                            title: 'ขาย ' + this.$store.state.current_page + ' สำเร็จ',
                            // timer: 1300,
                            text: 'ที่ราคา : ' + this.numberWithCommas(current_price) + ' THB | จำนวน : ' + this
                                .sell_value,
                        })

                        this.sell_value = 0
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'ทำรายการไม่สำเร็จ',
                            timer: 1500,
                            text: this.$store.state.current_page + ' ไม่พอ',
                        })
                    }
                }
            },
            check_value_buy() {
                return this.buy_value / this.$store.state.crypto_data[this.$store.state.current_page].last
            },
            check_value_sell() {
                return this.sell_value * this.$store.state.crypto_data[this.$store.state.current_page].last

            },
            forceRerender() {
                // Remove my-component from the DOM
                this.$store.state.renderComponent = false;

                this.$nextTick(() => {
                    // Add the component back in
                    this.$store.state.renderComponent = true;
                });
            },
            // check_crypto(symbol){

            // }
        },
        mounted() {

            // firebase.database().ref('users/' + localStorage.getItem("username") + '/asset').on('value', (snapshot) => {
            //     console.log(JSON.stringify(snapshot.value()))
            // })

            const dbRef = firebase.database().ref();
            dbRef.child("users").child(localStorage.getItem("username") + '/asset/' + this.$store.state.current_page)
                .get().then((snapshot) => {
                    if (!snapshot.exists()) {
                        firebase.database().ref('users/' + localStorage.getItem("username") + '/asset/' + this
                            .$store.state.current_page).set({
                            last_buy_price: 0,
                            last_buy_value: 0,
                            last_sell_price: 0,
                            last_sell_value: 0,
                            value: 0
                        })
                    }
                })

            firebase.database().ref('users/' + localStorage.getItem("username") + '/asset/' + this.$store.state
                .current_page).on('value', (snapshot) => {
                this.data_crypto = snapshot.val()
                // console.log(snapshot.val())
                // this.$store.state.current_asset = snapshot.val()
                // this.data = 
            })

            firebase.database().ref('users/' + localStorage.getItem("username") + '/asset/THB').on('value', (
                snapshot) => {
                this.data_thb = snapshot.val()
                // console.log(snapshot.val())
                // this.$store.state.current_asset = snapshot.val()
                // this.data = 
            })

            firebase.database().ref('chart_config/').on('value', (
                snapshot) => {
                this.$store.state.chart_config = snapshot.val()
                this.forceRerender()
            })
        },

    }
</script>
<style>
hr{
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}
.text-muted {
    color: white;
}
a{
    color: gray;
}
a:hover{
    color: gray;
}

.nav-tabs{
    border-bottom: 0px;
    margin-bottom: -2px;
}
.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active{
    background-color: #343A40;
    color: white;
    border: 0px;
}
</style>