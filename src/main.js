import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";
import firebase from "./plugins/firebase";
import "./plugins/axios";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  data: {
    loaded: false,
  },
  render(h) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.loaded = true;
        store.dispatch('SignOut');
      } else {
        this.loaded = true;
        store.dispatch("AuthUser", user);
        user.getIdToken(true).then((token) => store.commit("SET_TOKEN", token));
      }
    });
    return h(App);
  },
}).$mount("#app");
