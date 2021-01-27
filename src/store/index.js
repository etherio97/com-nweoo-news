import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    role: null,
    token: null,
  },

  mutations: {
    SET_AUTH(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_ROLE(state, role) {
      state.role = role;
    },
  },

  actions: {
    SignOut({ commit }) {
      commit("SET_AUTH", null);
      commit("SET_ROLE", null);
      commit("SET_TOKEN", null);
    },
    AuthUser({ commit }, user) {
      commit("SET_AUTH", user);
      commit("SET_ROLE", user.role);
    },
  },
});
