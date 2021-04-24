<template>
  <div>
    <b-row class="px-2 text-left">
      <b-col sm>
        <b-card v-if="$store.state.showPage" tag="article" class="mb-2 bg-dark">
          <div v-if="$store.state.renderComponent" class="chart">
            <VueTradingView :options='{
                    "autosize": true,
                    "symbol": "BITKUB:BTCTHB",
                    "interval": $store.state.chart_config.interval,
                    "timezone": $store.state.chart_config.timezone,
                    "theme": $store.state.chart_config.theme,
                    "style": $store.state.chart_config.style,
                    "locale": $store.state.chart_config.locale,
                    "toolbar_bg": $store.state.chart_config.toolbar_bg,
                    "enable_publishing": $store.state.chart_config.enable_publishing,
                    "hide_side_toolbar": $store.state.chart_config.hide_side_toolbar,
                    "withdateranges": $store.state.chart_config.withdateranges,
                    "allow_symbol_change": true,
                    "show_popup_button": $store.state.chart_config.show_popup_button,
                    "popup_width": $store.state.chart_config.popup_width,
                    "popup_height": $store.state.chart_config.popup_height,
                }' />
          </div>
        </b-card>
      </b-col>
      <b-col sm>
        <b-card class="bg-dark">
          <b-list-group>
            <b-list-group-item class="bg-dark  flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between" style="color: white;">
                <h5 class="mb-1"><img src="https://www.bitkub.com/static/images/icons/BTC.png" width="30" height="30"
                    alt="" srcset="" style="padding-bottom: 4px; padding-left: 4px;"> BTC</h5>
                <small style="color: white;">{{numberWithCommas($store.state.crypto_data.BTC.last)}}</small>
                <small style="color: white;"> <b
                    :class="checkColor($store.state.crypto_data.BTC.percentChange)">{{numberPersen($store.state.crypto_data.BTC.percentChange)}}%</b>
                  ({{numberWithCommas($store.state.crypto_data.BTC.change)}})</small>
              </div>
            </b-list-group-item>
            <b-list-group-item class="bg-dark flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between" style="color: white;">
                <h5 class="mb-1"><img src="https://www.bitkub.com/static/images/icons/ETH.png" width="30" height="30"
                    alt="" srcset="" style="padding-bottom: 4px; padding-left: 4px;"> ETH</h5>
                <small style="color: white;">{{numberWithCommas($store.state.crypto_data.ETH.last)}}</small>
                <small style="color: white;"> <b
                    :class="checkColor($store.state.crypto_data.ETH.percentChange)">{{numberPersen($store.state.crypto_data.ETH.percentChange)}}%</b>
                  ({{numberWithCommas($store.state.crypto_data.ETH.change)}})</small>
              </div>
            </b-list-group-item>
            <b-list-group-item class="bg-dark flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between" style="color: white;">
                <h5 class="mb-1"><img src="https://www.bitkub.com/static/images/icons/XRP.png" width="30" height="30"
                    alt="" srcset="" style="padding-bottom: 4px; padding-left: 4px;"> XRP</h5>
                <small style="color: white;">{{numberWithCommas($store.state.crypto_data.XRP.last)}}</small>
                <small style="color: white;"> <b
                    :class="checkColor($store.state.crypto_data.XRP.percentChange)">{{numberPersen($store.state.crypto_data.XRP.percentChange)}}%</b>
                  ({{numberWithCommas($store.state.crypto_data.XRP.change)}})</small>
              </div>
            </b-list-group-item>
            <b-list-group-item class="bg-dark flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between" style="color: white;">
                <h5 class="mb-1"><img src="https://www.bitkub.com/static/images/icons/BNB.png" width="30" height="30"
                    alt="" srcset="" style="padding-bottom: 4px; padding-left: 4px;"> BNB</h5>
                <small style="color: white;">{{numberWithCommas($store.state.crypto_data.BNB.last)}}</small>
                <small style="color: white;"> <b
                    :class="checkColor($store.state.crypto_data.BNB.percentChange)">{{numberPersen($store.state.crypto_data.BNB.percentChange)}}%</b>
                  ({{numberWithCommas($store.state.crypto_data.BNB.change)}})</small>
              </div>
            </b-list-group-item>
            <b-list-group-item class="bg-dark flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between" style="color: white;">
                <h5 class="mb-1"><img src="https://www.bitkub.com/static/images/icons/DOGE.png" width="30" height="30"
                    alt="" srcset="" style="padding-bottom: 4px; padding-left: 4px;"> DOGE</h5>
                <small style="color: white;">{{numberWithCommas($store.state.crypto_data.DOGE.last)}}</small>
                <small style="color: white;"> <b
                    :class="checkColor($store.state.crypto_data.DOGE.percentChange)">{{numberPersen($store.state.crypto_data.DOGE.percentChange)}}%</b>
                  ({{numberWithCommas($store.state.crypto_data.DOGE.change)}})</small>
              </div>
            </b-list-group-item>
            <b-list-group-item class="bg-dark flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between" style="color: white;">
                <h5 class="mb-1"><img src="https://www.bitkub.com/static/images/icons/USDT.png" width="30" height="30"
                    alt="" srcset="" style="padding-bottom: 4px; padding-left: 4px;"> USDT</h5>
                <small style="color: white;">{{numberWithCommas($store.state.crypto_data.USDT.last)}}</small>
                <small style="color: white;"> <b
                    :class="checkColor($store.state.crypto_data.USDT.percentChange)">{{numberPersen($store.state.crypto_data.USDT.percentChange)}}%</b>
                  ({{numberWithCommas($store.state.crypto_data.USDT.change)}})</small>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>

  </div>

</template>

<script>
  import firebase from '../firebase.js'
  const Swal = require('sweetalert2')
  import VueTradingView from 'vue-trading-view';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        items: [{
            age: 40,
            first_name: 'Dickerson',
            last_name: 'Macdonald'
          },
          {
            age: 21,
            first_name: 'Larsen',
            last_name: 'Shaw'
          },
          {
            age: 89,
            first_name: 'Geneva',
            last_name: 'Wilson'
          },
          {
            age: 38,
            first_name: 'Jami',
            last_name: 'Carney'
          }
        ]
      }
    },
    methods: {
      numberWithCommas(x) {
        var num2 = x.toFixed(2)
        return parseFloat(num2).toLocaleString()
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
      }
    },
    components: {
      VueTradingView,
    },
    mounted() {
      this.$store.state.titleBar = "Home"
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
  .chart {
    height: 550px;
  }

  #vue-trading-view {
    height: 100%;
  }

  .card-body {
    padding: 20px;
  }

  .list-group-item {
    padding: 10px;
  }

  .d-flex {
    height: 24px;
  }
</style>