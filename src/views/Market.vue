<template>
  <b-card v-if="$store.state.showPage" tag="article" class="mb-2 mr-3 ml-3 bg-dark" >
            <div class="chart">
                <VueTradingView :options='{
                    "height": 500,
                    "symbol": "BITKUB:BTCTHB",
                    "interval": "15",
                    "timezone": "Asia/Bangkok",
                    "theme": "dark",
                    "style": "1",
                    "locale": "th_TH",
                    "hide_side_toolbar": false,
                    "toolbar_bg": "#f1f3f6",
                    "withdateranges": true,
                    "allow_symbol_change": true,
                    "show_popup_button": true,
                    "popup_width": "1000",
                    "popup_height": "650",
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