import firebase from "firebase/app";

export default {
  namespaced: true,

  state: {
    currentUser: {},
    authToken: undefined,
    loggedIn: undefined,
  },

  mutations: {
    SET_TOKEN(state, payload) {
      state.authToken = payload;
    },
    SET_AUTH(state, payload) {
      state.currentUser = payload;
      state.loggedIn = true;
    },
    SIGN_OUT(state) {
      state.currentUser = {};
      state.authToken = undefined;
      state.loggedIn = false;
    },
  },

  actions: {
    FETCH_USER({ commit }) {
      const auth = firebase.auth();
      if (auth.currentUser) {
        commit('SET_AUTH', auth.currentUser);
        return auth.currentUser.getIdToken(true)
          .then(token => commit('SET_TOKEN', token));
      }
      return auth.signOut().then(() => commit('SIGN_OUT'));
    }
  }
};
