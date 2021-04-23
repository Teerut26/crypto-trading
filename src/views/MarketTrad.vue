<template>
  <div class="home">
      <b-row class="text-left">
        <b-col sm class="ml-3 "><Chart /></b-col>
        <b-col sm class="mr-3"><SellAndBuy /></b-col>
      </b-row>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Chart from '@/components/Chart.vue'
  import SellAndBuy from '@/components/SellAndBuy.vue'

  export default {
    name: 'Home',
    components: {
      Chart,
      SellAndBuy
    }
  }
</script>