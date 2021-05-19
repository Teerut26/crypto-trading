<template>
  <div class="content" v-if="$store.state.show_navbar">
    <!-- <p style="color: white;">{{data}}</p> -->
    <b-row class="text-left">
      <!-- {{$store.state.crypto_data}} -->
      <b-col cols="12" md="9">
        <b-card v-if="$store.state.showPage" tag="article" class="mb-2 bg-dark">
          <div v-if="$store.state.renderComponent" class="chart">
            <VueTradingView
              :options="{
                autosize: true,
                symbol: 'BITKUB:BTCTHB',
                interval: $store.state.chart_config.interval,
                timezone: $store.state.chart_config.timezone,
                theme: $store.state.chart_config.theme,
                style: $store.state.chart_config.style,
                locale: $store.state.chart_config.locale,
                toolbar_bg: $store.state.chart_config.toolbar_bg,
                enable_publishing: $store.state.chart_config.enable_publishing,
                hide_side_toolbar: $store.state.chart_config.hide_side_toolbar,
                withdateranges: $store.state.chart_config.withdateranges,
                allow_symbol_change: true,
                show_popup_button: $store.state.chart_config.show_popup_button,
                popup_width: $store.state.chart_config.popup_width,
                popup_height: $store.state.chart_config.popup_height,
              }"
            />
          </div>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="bg-dark">
          <b-list-group>
            <div class="ex4">
              <b-list-group-item
                v-for="item in key_crypto"
                :key="item"
                :class="
                  checkChang(item, $store.state.crypto_data[item].baseVolume) +
                    ' bg-dark flex-column align-items-start'
                "
                @click="
                  clickPage(
                    '/market/' + item,
                    item,
                    'thb_' + item.toLowerCase()
                  )
                "
                href="#"
              >
                <div
                  class="d-flex w-100 justify-content-between"
                  style="color: white;"
                >
                  <b-row>
                    <b-col>
                      <h5 class="mb-0">
                        <img
                          :src="
                            'https://www.bitkub.com/static/images/icons/' +
                              item +
                              '.png'
                          "
                          width="30"
                          height="30"
                          alt=""
                          srcset=""
                          style="padding-bottom: 4px; padding-left: 4px;"
                        />
                        {{ item }}
                      </h5>
                    </b-col>
                  </b-row>
                  <h5 style="float: right;" class="mb-0">
                    {{ numberWithCommas($store.state.crypto_data[item].last) }}
                  </h5>
                </div>
                <small style="color: white;"
                  >Vol :
                  {{
                    nFormatter($store.state.crypto_data[item].baseVolume, 1)
                  }}</small
                >
                <small style="color: white; float: right;"
                  ><b
                    :class="
                      checkColor($store.state.crypto_data[item].percentChange)
                    "
                    v-html="
                      numberPersen(
                        $store.state.crypto_data[item].percentChange,
                        item
                      ) + '%'
                    "
                  ></b
                ></small>
              </b-list-group-item>
            </div>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import firebase from "../firebase.js";
const Swal = require("sweetalert2");
const axios = require("axios");
import VueTradingView from "vue-trading-view";

export default {
  name: "HelloWorld",
  data() {
    return {
      key_crypto: [],
      data: {},
    };
  },
  methods: {
    nFormatter(num, digits) {
      var si = [
        {
          value: 1,
          symbol: "",
        },
        {
          value: 1e3,
          symbol: "k",
        },
        {
          value: 1e6,
          symbol: "M",
        },
        {
          value: 1e9,
          symbol: "G",
        },
        {
          value: 1e12,
          symbol: "T",
        },
        {
          value: 1e15,
          symbol: "P",
        },
        {
          value: 1e18,
          symbol: "E",
        },
      ];
      var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var i;
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }
      return (
        (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol
      );
    },
    checkChang(symbol, baseVolume) {
      var retrunData = Boolean;
      try {
        if (baseVolume != this.data["THB_" + symbol].baseVolume) {
          retrunData = "chang";
          setTimeout(() => {
            this.data["THB_" + symbol].baseVolume = baseVolume;
          }, 300);
        } else if (baseVolume == this.data["THB_" + symbol].baseVolume) {
          retrunData = "";
          // retrunData = baseVolume+' | '+this.data['THB_'+symbol].baseVolume
        }
        return retrunData;
      } catch (err) {
        console.log(err);
      }
    },
    getFirst() {
      var self = this;
      axios
        .get("https://www.bitkub.com/api/market/ticker")
        .then(function(response) {
          self.data = response.data.data;
          // console.log("🚀 ~ file: Market.vue ~ line 137 ~ response.data", response.data)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    clickPage(path, page, wssPath) {
      this.$store.state.current_page = page;
      this.$store.state.current_wss_path = wssPath;
      this.$router.push(path);
      // this.forceRerender() error
      this.forceRerender2();
    },
    // checkChang(symbol,percentChange){
    //   if (percentChange == data[symbol].percentChange) {

    //   }
    // },
    numberWithCommas(x) {
      try {
        var num2 = x.toFixed(2);
        return parseFloat(num2).toLocaleString();
      }catch(err){
        console.log(err)
      }
    },
    numberPersen(x) {
      // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (x < 0) {
        var num1 = x.toFixed(2);
        var num3 = parseFloat(num1).toLocaleString();
        var res = num3.replace("-", "");
        return '<i class="fas fa-caret-down"></i> ' + res;
      } else if (x > 0) {
        var num2 = x.toFixed(2);
        return (
          '<i class="fas fa-caret-up"></i> ' + parseFloat(num2).toLocaleString()
        );
      }
    },
    checkColor(number) {
      if (number < 0) {
        return "text-danger";
      } else {
        return "text-success";
      }
    },
  },
  components: {
    VueTradingView,
  },
  created() {
    console.log("Start");
    this.getFirst();
    // console.log("🚀 ~ file: Market.vue ~ line 105 ~ created ~ this.$store.state.crypto_data", this.$store.state.crypto_data)
  },
  mounted() {
    this.$store.state.titleBar = "Home";
    for (var key in this.$store.state.crypto_data) {
      this.key_crypto.push(key);
    }
    firebase
      .database()
      .ref("users/" + localStorage.getItem("username"))
      .on("value", (snapshot) => {
        if (snapshot.val() != null) {
          if (
            (localStorage.getItem("token") != null) &
            (localStorage.getItem("username") != null)
          ) {
            if (localStorage.getItem("token") == snapshot.val().token) {
              try {
                this.lists = snapshot.val().lists;
                // console.log(true)
                this.$store.state.email = snapshot.val().email;
                this.$store.state.token = localStorage.getItem("token");
                this.$store.state.username = localStorage.getItem("username");
                this.$store.state.showPage = true;
                this.getLoginLog();
              } catch (error) {
                console.log(error);
              }
            } else {
              Swal.fire({
                icon: "error",
                title: "Error!",
                text: "มีการ Login จากที่อื่น",
              }).then(() => {
                localStorage.removeItem("username");
                localStorage.removeItem("token");
                this.$store.state.show_navbar = false;
                this.$router.push("/login");
              });
              // console.log(false)
            }
          } else {
            this.$router.push("/login");
          }
        } else {
          this.$router.push("/login");
        }
      });
  },
};
</script>
<style>


#vue-trading-view {
  height: 100%;
}

.card-body {
  padding: 20px;
}

.list-group-item {
  padding: 10px;
}

/* .d-flex {
    height: 24px;
  } */

.content {
  margin-left: 20px;
  margin-right: 20px;
}

.col-sm {
  padding-left: 10px;
  padding-right: 10px;
}

@keyframes fadein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@-moz-keyframes fadein {
  /* Firefox */
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@-webkit-keyframes fadein {
  /* Safari and Chrome */
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  /* Safari and Chrome */
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@-o-keyframes fadein {
  /* Opera */
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* @media (min-width: 900px){

.col-md-9 {
    flex: 0 0 100%;
    max-width: 100%;
}

} */

@media (max-width: 1000px) {
  .col-md-9 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

.chang {
  background: linear-gradient(
    90deg,
    rgba(0, 224, 107, 0.38699229691876746) 0%,
    rgba(52, 58, 64, 0) 100%
  );
  /* border-color: rgb(2,214,103); */
  /* border-width: 1px; */
  /* border-radius: 10px; */
  /* -moz-animation: fadein 2s; */
  /* -webkit-animation: fadein 0.3s;  */
  /* -webkit-animation: fadeout 0.2s;  */
  /* -o-animation: fadein 2s;  */
}
</style>
