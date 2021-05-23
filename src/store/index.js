import Vue from "vue";
import vuex, { Store } from "vuex";
import reports from "./modules/reports";
import articles from "./modules/articles";
import videos from "./modules/videos";

Vue.use(vuex);

export default new Store({
  modules: {
    reports,
    articles,
    videos,
  }
});
