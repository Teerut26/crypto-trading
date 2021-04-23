<template>
    <div>
        <b-card title="Open order" class="mt-3 bg-dark" style="color: white;">
            <b-table striped bordered head-variant="dark" small :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :fields="fields" :items="data_order" responsive="sm">
                <template #cell(symbol)="data">
                    <b style="color: white;">{{ data.value}}</b>
                </template>
                <template #cell(spent_show)="data">
                    <b style="color: white;">{{ data.value }}</b>
                </template>
                <template #cell(order_type)="data">
                    <b style="color: white;">{{ data.value }}</b>
                </template>
                <template #cell(price_show)="data">
                    <b style="color: white;">{{ data.value }}</b>
                </template>
                <template #cell(you_received_show)="data">
                    <b style="color: white;">{{ data.value }}</b>
                </template>
                <template #cell(timestamp)="data">
                    <b style="color: white;">{{ timeCover(data.value) }}</b>
                </template>
            </b-table>
        </b-card>
    </div>

</template>

<script>
    import firebase from '../firebase.js'
    // const Swal = require('sweetalert2')
    //   const Swal = require('sweetalert2')
    export default {
        name: 'HelloWorld',
        data() {
            return {
                sortDesc: true,
                sortBy: 'timestamp',
                
                fields: [{
                        key: 'symbol',
                        label: 'Symbol' 
                    },
                    {
                        key: 'order_type',
                        label: 'Order Type',
                        sortable: true
                    },
                    {
                        key: 'spent_show',
                        label: 'Spent',
                        sortable: true
                    },
                    {
                        key: 'price_show',
                        label: 'Price',
                        sortable: true
                    },
                    {
                        key: 'you_received_show',
                        label: 'You Received',
                        sortable: true
                    },
                    {
                        key: 'timestamp',
                        label: 'timestamp',
                        sortable: true
                    },
                ],
                data_order: [],
            }
        },
        methods: {
            numberWithCommas(x) {
                var num = x.toFixed(3)
                return parseFloat(num).toLocaleString()
            },
            numberWithCommas2(x) {
                return parseFloat(x).toLocaleString()
            },
            timeCover(time) {
                var now = new Date(time);
                return now.toLocaleString()
            }
        },
        mounted() {

            firebase.database().ref('users/' + localStorage.getItem("username") + '/asset/' + this.$store.state
                .current_page + '/order').on('value', (snapshot) => {
                var data = snapshot.val()
                let obj = []
                for (var key in data) {
                    // console.log(data_order[key])
                    obj.push(data[key])
                }
                this.data_order = obj
                // console.log(JSON.stringify(obj))
                // this.$store.state.current_asset = snapshot.val()
                // this.data = 
            })
        },

    }
</script>