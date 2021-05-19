<template>

  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'
  import firebase from './firebase'

  export default {
    name: 'Home',
    components: {
      Navbar
    },
    data: () => ({
      connection: null,
      show: false
    }),
    created() {

    },
    mounted() {
      var self = this;
      firebase.database().ref('config_web').on('value', (snapshot) => {
        self.$store.state.config_web = snapshot.val()

      })
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap');

  .card {
    border-radius: 3px
  }

  * {
    font-family: 'Kanit', sans-serif;
  }

  .chart{
        height: calc(100vh - 134px);
    }

  bg-dark {
    background-color: #1A1E1E;
    color: white;
  }

  div.ex4 {
    width: 100%;
    height: calc(100vh - 140px);
    overflow: auto;
  }

  div.ex5 {
    width: 100%;
    height: calc(100vh - 170px);
    overflow: auto;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #CCCCCC;
    opacity: 0.5;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }
</style>