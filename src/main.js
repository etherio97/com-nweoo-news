import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "./plugins/firebase";
import "./plugins/axios";

Vue.config.productionTip = false;

const data = {
  loaded: false,
  user: null,
  api: "https://api.nweoo.com",
  network_mode: localStorage.getItem("network_mode") || "api", // 'rtdb' or 'api'
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

firebase.auth().onAuthStateChanged(user => {
  data.user = user;
});
