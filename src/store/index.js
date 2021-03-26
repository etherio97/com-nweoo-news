import Vue from "vue";
import vuex from "vuex";
import reports from "./modules/reports"

Vue.use(vuex);

export default new vuex.Store({
  modules: {
    reports,
  },
});
