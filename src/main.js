import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";
import "./plugins/firebase";
import "./plugins/axios";

Vue.config.productionTip = false;

new Vue({
  data: {
    loaded: false,
  },
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
