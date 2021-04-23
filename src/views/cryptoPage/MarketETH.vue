<template>
  <div v-if="$store.state.showPage" class="home">
      <b-row class="text-left">
        <b-col sm class="ml-3 "><Chart /></b-col>
        <b-col sm class="mr-3"><SellAndBuy /></b-col>
      </b-row>
  </div>
</template>

<script>
  import firebase from './firebase.js'
  const Swal = require('sweetalert2')
  // @ is an alias to /src
  import Chart from '@/components/Chart.vue'
  import SellAndBuy from '@/components/SellAndBuy.vue'

  export default {
    name: 'Home',
    components: {
      Chart,
      SellAndBuy
    },
    created: function () {
      this.$store.state.current_page = "ETH"
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