import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
// import VueRecaptcha from 'vue-grecaptcha'

// Vue.use(VueRecaptcha, {
//   sitekey: '6LdTWrYaAAAAAM_bCzQPEPgBcqnLO3q_6zTb26WQ'
// })

// import VueRouter from "vue-router";
// import NotFound from './components/404.vue';

// Vue.use(VueRouter);

// const router = new VueRouter({
//   mode: "history",
//   routes: [
//     { path: '*', component: NotFound }
//   ]
// })

Vue.config.productionTip = false

Vue.use(VueMeta)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
