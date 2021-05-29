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
  user: {},
  api: "https://api.nweoo.com",
};

if (process.env.NODE_ENV !== 'production') {
  data.api = "http://localhost:5500";
}

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
