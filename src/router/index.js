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
    path: '/market/BTC',
    name: 'MarketTrad',
    component: () => import('../views/cryptoPage/MarketBTC.vue')
  },
  {
    path: '/market/ETH',
    name: 'MarketTrad',
    component: () => import('../views/cryptoPage/MarketETH.vue')
  },
  {
    path: '/market/XRP',
    name: 'MarketTrad',
    component: () => import('../views/cryptoPage/MarketXRP.vue')
  },
  {
    path: '/market/BNB',
    name: 'MarketTrad',
    component: () => import('../views/cryptoPage/MarketBNB.vue')
  },
  {
    path: '/market/DOGE',
    name: 'MarketTrad',
    component: () => import('../views/cryptoPage/MarketDOGE.vue')
  },
  {
    path: '/market/USDT',
    name: 'MarketTrad',
    component: () => import('../views/cryptoPage/MarketUSDT.vue')
  },
  {
    path: '/market/IOST',
    name: 'MarketTrad',
    component: () => import('../views/cryptoPage/MarketIOST.vue')
  },
  {
    path: '/market/ADA',
    name: 'MarketTrad',
    component: () => import('../views/cryptoPage/MarketADA.vue')
  },
  {
    path: '/market/SIX',
    name: 'MarketTrad',
    component: () => import('../views/cryptoPage/MarketSIX.vue')
  },
  {
    path: '/market/MANA',
    name: 'MarketTrad',
    component: () => import('../views/cryptoPage/MarketMANA.vue')
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
