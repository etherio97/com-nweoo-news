import Vue from "vue";
import vuex from "vuex";
import reports from "./modules/reports";
import articles from "./modules/articles";
import regionState from "./modules/regionState";

Vue.use(vuex);

export default new vuex.Store({
  modules: {
    reports,
    articles,
    regionState
  }
});
