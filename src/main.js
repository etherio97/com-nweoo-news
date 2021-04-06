import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// import VueVideoPlayer from 'vue-video-player'
import "./plugins/firebase";
import "./plugins/axios";

// Global CSS
// import 'video.js/dist/video-js.css'


// Vue.use(VueVideoPlayer, /* {
//   options: global default options,
//   events: global videojs events
// } */)

const cookies = {};

Vue.config.productionTip = false;

const data = {
  loaded: false,
  user: null,
  api: "https://api.nweoo.com",
  ga: null,
  times: 0
};

if (process.env.NODE_ENV !== "production") {
  // data.api = "http://localhost:3000";
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

if ("cookie" in document) {
  document.cookie.split(";").forEach(c => {
    let [n, ...v] = c.split("=");
    cookies[n.trim()] = v.join("=");
  });
  if (cookies["_ga"]) data.ga = cookies["_ga"];
}
