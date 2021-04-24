<template>
    <div>
        <b-card  v-if="$store.state.renderComponent"  tag="article" class="mb-2 bg-dark" style="color: white;">
            <b-card-text>
                <h3><img style="padding-bottom: 4px; padding-left: 4px;" :src="'https://www.bitkub.com/static/images/icons/'+$store.state.current_page+'.png'" width="30" height="30" alt="" srcset=""> <b>{{$store.state.current_page}}</b></h3>
            <b-row v-if="$store.state.current_page == 'BTC'">
                <b-col>ราคาล่าสุด (THB)<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.BTC.last)}}</b></h5></b-col>
                <b-col>เปลี่ยน 24 H<br><h5><b :class="checkColor($store.state.crypto_data.BTC.percentChange)">{{numberPersen($store.state.crypto_data.BTC.percentChange)}}%</b></h5></b-col>
                <b-col>24 H สูงสุด<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.BTC.high24hr)}}</b></h5></b-col>
                <b-col>24 H ต่ำสุด<br><h5><b class="text-danger">{{numberWithCommas($store.state.crypto_data.BTC.low24hr)}}</b></h5></b-col>
                <b-col>ปริมาณ 24 H ({{$store.state.current_page}})<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.BTC.baseVolume)}}</b></h5></b-col>
            </b-row>
            <b-row v-else-if="$store.state.current_page == 'ETH'">
                <b-col>ราคาล่าสุด (THB)<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.ETH.last)}}</b></h5></b-col>
                <b-col>เปลี่ยน 24 H<br><h5><b :class="checkColor($store.state.crypto_data.ETH.percentChange)">{{numberPersen($store.state.crypto_data.ETH.percentChange)}}%</b></h5></b-col>
                <b-col>24 H สูงสุด<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.ETH.high24hr)}}</b></h5></b-col>
                <b-col>24 H ต่ำสุด<br><h5><b class="text-danger">{{numberWithCommas($store.state.crypto_data.ETH.low24hr)}}</b></h5></b-col>
                <b-col>ปริมาณ 24 H ({{$store.state.current_page}})<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.ETH.baseVolume)}}</b></h5></b-col>
            </b-row>
            <b-row v-else-if="$store.state.current_page == 'XRP'">
                <b-col>ราคาล่าสุด (THB)<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.XRP.last)}}</b></h5></b-col>
                <b-col>เปลี่ยน 24 H<br><h5><b :class="checkColor($store.state.crypto_data.XRP.percentChange)">{{numberPersen($store.state.crypto_data.XRP.percentChange)}}%</b></h5></b-col>
                <b-col>24 H สูงสุด<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.XRP.high24hr)}}</b></h5></b-col>
                <b-col>24 H ต่ำสุด<br><h5><b class="text-danger">{{numberWithCommas($store.state.crypto_data.XRP.low24hr)}}</b></h5></b-col>
                <b-col>ปริมาณ 24 H ({{$store.state.current_page}})<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.XRP.baseVolume)}}</b></h5></b-col>
            </b-row>
            <b-row v-else-if="$store.state.current_page == 'BNB'">
                <b-col>ราคาล่าสุด (THB)<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.BNB.last)}}</b></h5></b-col>
                <b-col>เปลี่ยน 24 H<br><h5><b :class="checkColor($store.state.crypto_data.BNB.percentChange)">{{numberPersen($store.state.crypto_data.BNB.percentChange)}}%</b></h5></b-col>
                <b-col>24 H สูงสุด<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.BNB.high24hr)}}</b></h5></b-col>
                <b-col>24 H ต่ำสุด<br><h5><b class="text-danger">{{numberWithCommas($store.state.crypto_data.BNB.low24hr)}}</b></h5></b-col>
                <b-col>ปริมาณ 24 H ({{$store.state.current_page}})<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.BNB.baseVolume)}}</b></h5></b-col>
            </b-row>
            <b-row v-else-if="$store.state.current_page == 'DOGE'">
                <b-col>ราคาล่าสุด (THB)<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.DOGE.last)}}</b></h5></b-col>
                <b-col>เปลี่ยน 24 H<br><h5><b :class="checkColor($store.state.crypto_data.DOGE.percentChange)">{{numberPersen($store.state.crypto_data.DOGE.percentChange)}}%</b></h5></b-col>
                <b-col>24 H สูงสุด<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.DOGE.high24hr)}}</b></h5></b-col>
                <b-col>24 H ต่ำสุด<br><h5><b class="text-danger">{{numberWithCommas($store.state.crypto_data.DOGE.low24hr)}}</b></h5></b-col>
                <b-col>ปริมาณ 24 H ({{$store.state.current_page}})<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.DOGE.baseVolume)}}</b></h5></b-col>
            </b-row>
            <b-row v-else-if="$store.state.current_page == 'USDT'">
                <b-col>ราคาล่าสุด (THB)<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.USDT.last)}}</b></h5></b-col>
                <b-col>เปลี่ยน 24 H<br><h5><b :class="checkColor($store.state.crypto_data.USDT.percentChange)">{{numberPersen($store.state.crypto_data.USDT.percentChange)}}%</b></h5></b-col>
                <b-col>24 H สูงสุด<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.USDT.high24hr)}}</b></h5></b-col>
                <b-col>24 H ต่ำสุด<br><h5><b class="text-danger">{{numberWithCommas($store.state.crypto_data.USDT.low24hr)}}</b></h5></b-col>
                <b-col>ปริมาณ 24 H ({{$store.state.current_page}})<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data.USDT.baseVolume)}}</b></h5></b-col>
            </b-row>
            </b-card-text>
            <div v-if="$store.state.current_page == 'BTC'" class="chart">
                <VueTradingView :options='{
                    "autosize": true,
                    "symbol": "BITKUB:BTCTHB",
                    "interval": "15",
                    "timezone": "Asia/Bangkok",
                    "theme": "dark",
                    "style": "1",
                    "locale": "th_TH",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "hide_side_toolbar": false,
                    "withdateranges": true,
                    "allow_symbol_change": true,
                    "show_popup_button": true,
                    "popup_width": "1000",
                    "popup_height": "650",
                }' />
            </div>
            <div v-else-if="$store.state.current_page == 'ETH'" class="chart">
                <VueTradingView :options='{
                    "autosize": true,
                    "symbol": "BITKUB:ETHTHB",
                    "interval": "15",
                    "timezone": "Asia/Bangkok",
                    "theme": "dark",
                    "style": "1",
                    "locale": "th_TH",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "hide_side_toolbar": false,
                    "withdateranges": true,
                    "allow_symbol_change": true,
                    "show_popup_button": true,
                    "popup_width": "1000",
                    "popup_height": "650",
                }' />
            </div>
            <div v-else-if="$store.state.current_page == 'XRP'" class="chart">
                <VueTradingView :options='{
                    "autosize": true,
                    "symbol": "BITKUB:XRPTHB",
                    "interval": "15",
                    "timezone": "Asia/Bangkok",
                    "theme": "dark",
                    "style": "1",
                    "locale": "th_TH",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "hide_side_toolbar": false,
                    "withdateranges": true,
                    "allow_symbol_change": true,
                    "show_popup_button": true,
                    "popup_width": "1000",
                    "popup_height": "650",
                }' />
            </div>
            <div v-else-if="$store.state.current_page == 'BNB'" class="chart">
                <VueTradingView :options='{
                    "autosize": true,
                    "symbol": "BITKUB:BNBTHB",
                    "interval": "15",
                    "timezone": "Asia/Bangkok",
                    "theme": "dark",
                    "style": "1",
                    "locale": "th_TH",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "hide_side_toolbar": false,
                    "withdateranges": true,
                    "allow_symbol_change": true,
                    "show_popup_button": true,
                    "popup_width": "1000",
                    "popup_height": "650",
                }' />
            </div>
            <div v-else-if="$store.state.current_page == 'DOGE'" class="chart">
                <VueTradingView :options='{
                    "autosize": true,
                    "symbol": "BITKUB:DOGETHB",
                    "interval": "15",
                    "timezone": "Asia/Bangkok",
                    "theme": "dark",
                    "style": "1",
                    "locale": "th_TH",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "hide_side_toolbar": false,
                    "withdateranges": true,
                    "allow_symbol_change": true,
                    "show_popup_button": true,
                    "popup_width": "1000",
                    "popup_height": "650",
                }' />
            </div>
            <div v-else-if="$store.state.current_page == 'USDT'" class="chart">
                <VueTradingView :options='{
                    "autosize": true,
                    "symbol": "BITKUB:USDTTHB",
                    "interval": "15",
                    "timezone": "Asia/Bangkok",
                    "theme": "dark",
                    "style": "1",
                    "locale": "th_TH",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "hide_side_toolbar": false,
                    "withdateranges": true,
                    "allow_symbol_change": true,
                    "show_popup_button": true,
                    "popup_width": "1000",
                    "popup_height": "650",
                }' />
            </div>
        </b-card>
    </div>

</template>

<script>
    import VueTradingView from 'vue-trading-view';

    export default {
        data: () => ({
            data_render: {}
        }),
        name: 'HelloWorld',
        props: {
            msg: String
        },
        methods:{
            numberWithCommas(x){
                var num2 = x.toFixed(2)
                return parseFloat(num2).toLocaleString()
            },
            numberPersen(x){
                // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                if (x<0) {
                    var num1 = x.toFixed(2)
                    return parseFloat(num1).toLocaleString()
                }else if(x>0){
                    var num2 = x.toFixed(2)
                    return '+'+parseFloat(num2).toLocaleString()
                }
            },
            checkColor(number){
                if (number < 0) {
                    return "text-danger"
                }else{
                    return "text-success"
                }
            }
        },
        components: {
            VueTradingView,
        }
    }
</script>
<style>
    .chart{
        height: 500px;
    }
    #vue-trading-view{
        height: 100%;
    }
    .card-body{
        padding: px;
    }
</style>