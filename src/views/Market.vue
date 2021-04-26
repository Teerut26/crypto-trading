<template>
  <div v-if="$store.state.show_navbar" >
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
            <div class="ex4">
              <b-list-group-item v-for="item in key_crypto" :key="item" class="bg-dark  flex-column align-items-start"
                @click="clickPage('/market/'+item,item,'thb_'+item.toLowerCase())" href="#">
                <div class="d-flex w-100 justify-content-between" style="color: white;">
                  <h5 class="mb-1"><img :src="'https://www.bitkub.com/static/images/icons/'+item+'.png'" width="30"
                      height="30" alt="" srcset="" style="padding-bottom: 4px; padding-left: 4px;"> {{item}}</h5>
                  <small style="color: white; ">{{numberWithCommas($store.state.crypto_data[item].last)}}</small>
                  <small style="color: white;"> <b
                      :class="checkColor($store.state.crypto_data[item].percentChange)">{{numberPersen($store.state.crypto_data[item].percentChange)}}%</b>
                    ({{numberWithCommas($store.state.crypto_data[item].change)}})</small>
                </div>
              </b-list-group-item>
            </div>
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
        key_crypto: []
      }
    },
    methods: {
      clickPage(path, page, wssPath) {
        this.$store.state.current_page = page
        this.$store.state.current_wss_path = wssPath
        this.$router.push(path)
        // this.forceRerender() error
        this.forceRerender2()
      },
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
      for (var key in this.$store.state.crypto_data) {
        this.key_crypto.push(key)
      }
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