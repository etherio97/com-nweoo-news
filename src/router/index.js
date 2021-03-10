import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./route";
import goTo from "vuetify/es5/services/goto";

let appName;

Vue.use(VueRouter);

Vue.mixin({
  beforeRouteEnter(to, from, next) {
    to.name && setTitle(to.name);
    next();
  },
});

routes.push({
  name: "NotFound",
  path: "*",
  component: () => import("../views/404.vue"),
});

export default new VueRouter({
  scrollBehavior(from, to, pos) {
    let s = 0;
    if (from.hash) {
      s = from.hash;
    } else if (pos) {
      s = pos.y;
    }
    goTo(s);
  },
  mode: "history",
  routes,
});

function setTitle(title) {
  if (typeof document === "undefined") return;
  const el = document.querySelector("title");
  appName = appName || el.textContent.trim();
  el.textContent = `${title} | ${appName}`;
}
