import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import JsonExcel from "vue-json-excel";
import VueNumeric from 'vue-numeric'


Vue.component("downloadExcel", JsonExcel);
Vue.component("vue-numeric", VueNumeric);

Vue.config.productionTip = false

Vue.use(VueMeta)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
