import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
// import VueAnalytics from 'vue-analytics';

Vue.config.productionTip = false

Vue.use(VueMeta)

// Vue.use(VueAnalytics, {
//   id: 'UA-xxxxxxxxx-x'
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
