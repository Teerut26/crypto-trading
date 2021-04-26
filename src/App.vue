<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'


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

    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap');

  * {
    font-family: 'Kanit', sans-serif;
  }

  bg-dark {
    background-color: #1A1E1E;
    color: white;
  }

  div.ex4 {
    width: 100%;
    height: 500px;
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