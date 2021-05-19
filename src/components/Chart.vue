<template>
    <div>
        <b-card v-if="$store.state.renderComponent" tag="article" class="mb-2 bg-dark" style="color: white;">
            <b-card-text>
                <h3><img style="padding-bottom: 4px; padding-left: 4px;" :src="'https://www.bitkub.com/static/images/icons/'+$store.state.current_page+'.png'" width="30" height="30" alt="" srcset=""> <b>{{$store.state.current_page}}</b></h3>
                <b-row>
                    <b-col>ราคาล่าสุด (THB)<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data[$store.state.current_page].last)}}</b></h5></b-col>
                    <b-col>เปลี่ยน 24 H<br><h5><b :class="checkColor($store.state.crypto_data[$store.state.current_page].percentChange)">{{numberPersen($store.state.crypto_data[$store.state.current_page].percentChange)}}%</b></h5></b-col>
                    <b-col>24 H สูงสุด<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data[$store.state.current_page].high24hr)}}</b></h5></b-col>
                    <b-col>24 H ต่ำสุด<br><h5><b class="text-danger">{{numberWithCommas($store.state.crypto_data[$store.state.current_page].low24hr)}}</b></h5></b-col>
                    <b-col>ปริมาณ 24 H ({{$store.state.current_page}})<br><h5><b class="text-success">{{numberWithCommas($store.state.crypto_data[$store.state.current_page].baseVolume)}}</b></h5></b-col>
                </b-row>
            </b-card-text>
            <div class="chart">
                <VueTradingView :options='{
                    "autosize": true,
                    "symbol": "BITKUB:"+$store.state.current_page+"THB",
                    "interval": $store.state.chart_config.interval,
                    "timezone": $store.state.chart_config.timezone,
                    "theme": $store.state.chart_config.theme,
                    "style": $store.state.chart_config.style,
                    "locale": $store.state.chart_config.locale,
                    "toolbar_bg": $store.state.chart_config.toolbar_bg,
                    "enable_publishing": $store.state.chart_config.enable_publishing,
                    "hide_side_toolbar": $store.state.chart_config.hide_side_toolbar,
                    "withdateranges": $store.state.chart_config.withdateranges,
                    "allow_symbol_change": $store.state.chart_config.allow_symbol_change,
                    "show_popup_button": $store.state.chart_config.show_popup_button,
                    "popup_width": $store.state.chart_config.popup_width,
                    "popup_height": $store.state.chart_config.popup_height,
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
    #vue-trading-view{
        height: 100%;
    }
    .card-body{
        padding: 20px;
    }
</style>