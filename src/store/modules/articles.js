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
      return axios.get(`${api}/articles?limit=20`).then(({ data }) =>
        commit(
          "SET_ARTICLES",
          data.sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
        )
      );
    }
  }
};
