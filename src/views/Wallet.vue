<template>
    <div class="container mt-3" v-if="$store.state.show_navbar">
        <b-card class="bg-dark">
            <h3><i class="fad fa-wallet"></i> กระเป๋าตัง</h3>
            <b-form-group><h5> {{numberWithCommas2(thb)}} THB</h5></b-form-group>
            <b-form-group >
                <b-input-group size="sm">
                    <b-form-input id="filter-input" v-model="filter" type="search" placeholder="ค้นหาเหรียญ">
                    </b-form-input>
                </b-input-group>
            </b-form-group>
            <b-table sticky-header :current-page="currentPage" :filter="filter" striped bordered head-variant="dark"
                :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :fields="fields" :items="data_list">
                <template #cell(symbol)="data">
                    <img :src="'https://www.bitkub.com/static/images/icons/'+data.value+'.png'" alt="">
                    <b href="#" class="ml-3" style="color: white;">{{ data.value}}</b>
                </template>
                <template #cell(value_show)="data">
                    <b style="color: white;">{{ data.value }}</b>
                </template>
                <template #cell(price_crypto)="data">
                    <b style="color: white;">{{ currentPrice(data.value.symbol,data.value.value) }}</b>
                </template>
            </b-table>
            <download-excel name="wallet.xls" class="btn mb-2 btn-outline-primary" :data="data_list">
                <i class="text-primary fad fa-download"></i> Export To Excel
            </download-excel>
            <download-excel type="csv" name="wallet.csv" class="btn ml-2 mb-2 btn-outline-primary" :data="data_list">
                <i class="text-primary fad fa-download"></i> Export To CSV
            </download-excel>
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
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
                thb: 0,
                sortDesc: false,
                sortBy: 'symbol',
                filter: null,
                fields: [{
                        key: 'symbol',
                        label: 'Symbol',
                        sortable: true
                    },
                    {
                        key: 'value_show',
                        label: 'จำนวน',
                        sortable: true
                    },
                    {
                        key: 'price_crypto',
                        label: 'มูลค่า THB'
                    }
                ],
                data_list: []
            }
        },
        methods: {
            numberWithCommas(x) {
                var num2 = x.toFixed(6)
                return parseFloat(num2).toLocaleString()
            },
            currentPrice(crypto, num) {
                return this.numberWithCommas0(num * this.$store.state.crypto_data[crypto].last)
            },
            numberWithCommas8(x) {
                var num2 = x.toFixed(8)
                var parts = num2.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return parts.join(".");
            },
            numberWithCommas0(x) {
                var num2 = x.toFixed(0)
                var parts = num2.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return parts.join(".");
            },
            numberWithCommas2(x) {
                var num2 = x.toFixed(2)
                var parts = num2.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return parts.join(".");
            },
            numberPersen(x) {
                // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                if (x < 0) {
                    var num1 = x.toFixed(2)
                    return parseFloat(num1).toLocaleString()
                } else if (x > 0) {
                    var num2 = x.toFixed(2)
                    return '+' + parseFloat(num2).toLocaleString()
                }
            },
            checkColor(number) {
                if (number < 0) {
                    return "text-danger"
                } else {
                    return "text-success"
                }
            },

        },
        components: {},
        mounted() {
            this.$store.state.titleBar = "Wallet"
            var self = this;
            firebase.database().ref('users/' + localStorage.getItem("username") + '/asset/').on('value', (
                snapshot) => {
                self.thb = snapshot.val()['THB'].value
                var obj = []
                for (var key in snapshot.val()) {
                    // console.log(snapshot.val())
                    if (snapshot.val()[key].value != 0 && key != 'THB') {
                        
                        obj.push({
                            symbol: key,
                            value: snapshot.val()[key].value,
                            value_show: self.numberWithCommas8(snapshot.val()[key].value),
                            price_crypto: {
                                symbol: key,
                                value: snapshot.val()[key].value
                            }
                        })

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
    * {
        color: white;
    }
    .b-table-sticky-header{
        max-height: 500px;
    }
    .card-body {
        padding: 20px;
    }
</style>