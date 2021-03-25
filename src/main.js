import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "./plugins/firebase";
import "./plugins/axios";

Vue.config.productionTip = false;

const data = {
  loaded: false,
  user: null,
  api: 'https://api.nweoo.com'
  // api: 'http://localhost:3000'
};

new Vue({
  data,
  router,
  render: (h) => {
    return h(App);
  },
  vuetify,
}).$mount("#app");
