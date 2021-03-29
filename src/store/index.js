import Vue from "vue";
import vuex from "vuex";
import reports from "./modules/reports"
import regionState from "./modules/regionState"

Vue.use(vuex);

export default new vuex.Store({
  modules: {
    reports,
    regionState,
  },
});
