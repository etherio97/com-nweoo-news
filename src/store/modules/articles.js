import axios from "axios";

export default {
  namespaced: true,

  state: {
    items: []
  },

  mutations: {
    SET_ARTICLES(state, payload) {
      state.items = payload;
    }
  },

  actions: {
    FETCH_ARTICLES({ commit }, payload) {
      const { url } = payload;
      return axios
        .get(`${url}/articles?limit=20`)
        .then(({ data }) => commit("SET_ARTICLES", data.reverse()));
    }
  }
};
