import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current_page: "BTC",
    wss_data_ticker: {},
    current_wss_path: "thb_btc",
    current_asset:{},
    show_navbar:false,
    renderComponent: true,
    showPage:false,
    crypto_data: {
      BTC: {},
      ETH: {},
      XRP: {},
      BNB: {},
      DOGE: {},
      USDT: {},
    },
    titleBar:"Home",
    token:"",
    username:"",
    email:"",
    group:0,
  },
  mutations: {},
  actions: {},
  modules: {}
})