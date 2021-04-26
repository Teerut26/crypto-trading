import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Market',
    component: () => import('../views/Market.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/market/',
    name: 'market',
    component: () => import('../views/Market.vue')
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: () => import('../views/Wallet.vue')
  },
  {
    path: '/activity',
    name: 'log',
    component: () => import('../views/Log.vue')
  },
  {
    path: '/market/:slug',
    name: 'MarketTemplace',
    component: () => import('../views/MarketTemplace.vue')
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
