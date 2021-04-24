<template>
  <b-card v-if="$store.state.showPage" tag="article" class="mb-2 mr-3 ml-3 bg-dark" >
            <div class="chart">
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
                    "allow_symbol_change": $store.state.chart_config.allow_symbol_change,
                    "show_popup_button": $store.state.chart_config.show_popup_button,
                    "popup_width": $store.state.chart_config.popup_width,
                    "popup_height": $store.state.chart_config.popup_height,
                }' />
            </div>
        </b-card>
</template>

<script>
    import firebase from '../firebase.js'
    const Swal = require('sweetalert2')
    import VueTradingView from 'vue-trading-view';

    export default {
        name: 'HelloWorld',
        props: {
            msg: String
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
    .chart{
        height: 500px;
    }
    #vue-trading-view{
        height: 100%;
    }
    .card-body{
        padding: 0px;
    }
</style>