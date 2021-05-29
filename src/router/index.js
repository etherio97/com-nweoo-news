import Vue from "vue";
import VueRouter from "vue-router";
import _ from "lodash";
import routes from "./route";
import goTo from "vuetify/es5/services/goto";

let appName = 'NweOo';

const setTitle = title => {
  if (typeof document === "undefined") return;
  const el = document.querySelector("title");
  if (!('article' in window)) {
    console.log('no var:article');
    el.textContent = `${_.startCase(title)} | ${appName}`;
  }
};

const scrollBehavior = (from, to, pos) => {
  let s = 0;
  if (from.hash) {
    s = from.hash;
  } else if (pos) {
    s = pos.y;
  }
  goTo(s);
};

Vue.use(VueRouter);

Vue.mixin({
  beforeRouteEnter(to, from, next) {
    setTitle(to["title"] || to["name"] || appName);
    next();
  }
});

routes.push({
  name: "NotFound",
  path: "*",
  component: () => import("../views/errors/404.vue")
});

export default new VueRouter({
  routes,
  scrollBehavior,
  mode: "history"
});
