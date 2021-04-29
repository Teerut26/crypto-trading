<template>
    <div>
        <b-card  title="Open order" class="mt-3 bg-dark" style="color: white;">

            <b-form-group label="Search">
                <b-input-group size="sm">
                    <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Type to Search">
                    </b-form-input>
                </b-input-group>
            </b-form-group>

            <b-table :current-page="currentPage" :per-page="perPage" :filter="filter" striped bordered
                head-variant="dark" small :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :fields="fields"
                :items="data_order" responsive="sm">
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
                <template #cell(status)="data">
                    <b style="color: white;">{{ data.value }}</b>
                </template>
                <template #cell(timestamp)="data">
                    <b style="color: white;">{{ timeCover(data.value) }}</b>
                </template>
            </b-table>
            <b-form-group>
                <b-pagination variant="dark" v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                    align="fill" size="sm" class="my-0 "></b-pagination>
            </b-form-group>
            <b-form-group>
                <download-excel :name="this.$store.state.current_page+'.xls'" class="btn btn-outline-primary"
                    :data="data_order">
                    <i class="fad fa-download"></i> Export To Excel
                </download-excel>

                <download-excel type="csv" :name="this.$store.state.current_page+'.csv'"
                    class=" ml-2 btn btn-outline-primary" :data="data_order">
                    <i class="fad fa-download"></i> Export To CSV
                </download-excel>
            </b-form-group>
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
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
                sortDesc: true,
                sortBy: 'timestamp',
                filter: null,
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
                        label: 'ใช้ไป',
                        sortable: true
                    },
                    {
                        key: 'price_show',
                        label: 'ราคา',
                        sortable: true
                    },
                    {
                        key: 'status',
                        label: 'สถานะ',
                        sortable: true
                    },
                    {
                        key: 'timestamp',
                        label: 'เวลา',
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
                .current_page + '/order_limit').on('value', (snapshot) => {
                var data = snapshot.val()
                let obj = []
                for (var key in data) {
                    // console.log(data_order[key])
                    obj.push(data[key])
                }
                
                this.data_order = obj
                
                this.totalRows = this.data_order.length

                // console.log(JSON.stringify(obj))
                // this.$store.state.current_asset = snapshot.val()
                // this.data = 
            })

        },

    }
</script>
<style>
    /* .form-control{
    background-color: #343a40!important;
    color: white;
} */
</style>