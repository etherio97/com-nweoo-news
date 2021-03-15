import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "./plugins/firebase";
import i18n from './i18n';
import "./plugins/axios";

Vue.config.productionTip = false;

const data = {
  loaded: false,
  logged: false,
  user: null,
};

new Vue({
  data,
  router,
  vuetify,
  i18n,
  render: (h) => {
    firebase.auth().onAuthStateChanged((user) => {
      data.user = user;
      data.logged = Boolean(user);
    });
    return h(App);
  },
}).$mount("#app");
