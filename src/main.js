import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/firebase";
import "./plugins/axios";
import "./plugins/socket";

Vue.config.productionTip = false;

const data = {
  loaded: false,
  user: null,
  api: "https://api.nweoo.com"
};

new Vue({
  data,
  router,
  render: h => {
    return h(App);
  },
  store,
  vuetify
}).$mount("#app");
