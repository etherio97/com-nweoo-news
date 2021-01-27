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
    firebase.auth().onAuthStateChanged((user) =>
      store.dispatch("AuthUser", user).then(() =>
        user
          ? user
              .getIdToken(true)
              .then((token) => this.$store.commit("SET_TOKEN", token))
              .then(() => (this.loaded = true))
          : (this.loaded = true) | this.$store.dispatch("SignOut")
      )
    );
    return h(App);
  },
}).$mount("#app");
