import firebase from "firebase/app";

const actions = {
  registerEvent({ commit }) {
    commit("AUTH_REGISTERED", true);
    firebase.auth().onAuthStateChanged((user) => commit("AUTH_USER", user));
  },
};

const mutations = {
  AUTH_REGISTERED(state, payload) {
    state.registered = payload;
  },

  AUTH_USER(state, payload) {
    state.user = payload || {};
    state.logged = Boolean(payload);
  },
};

const state = {
  registered: false,
  logged: false,
  user: {},
};

export default {
  namespaced: true,
  state: () => state,
  mutations,
  actions,
};
