import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chart_config:{
      interval:"15",
      timezone:"Asia/Bangkok",
      theme:"dark",
      style:"1",
      locale:"th_TH",
      toolbar_bg:"#f1f3f6",
      hide_side_toolbar:true,
      enable_publishing:false,
      withdateranges:false,
      allow_symbol_change:false,
      show_popup_button:false,
      popup_width:"1000",
      popup_height:"650",
    },
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