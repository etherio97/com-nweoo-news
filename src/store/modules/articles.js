import axios from "axios";
import firebase from "firebase/app";

export default {
  namespaced: true,

  state: {
    items: [],
    headlines: []
  },

  mutations: {
    PUSH_ARTICLE(state, payload) {
      state.items.unshift(payload);
    },
    PUSH_HEADLINE(state, payload) {
      state.headlines.unshift(payload);
    }
  },

  actions: {
    FETCH_ARTICLES({ commit }, payload) {
      return axios
        .get(`${payload.api}/articles?limit=21`)
        .then(({ data }) =>
          Object.values(data).forEach(article =>
            commit("PUSH_ARTICLE", article)
          )
        );
    },

    FETCH_HEADLINES({ commit }, payload) {
      return axios
        .get(`${payload.api}/news/headlines?limit=10`)
        .then(({ data }) =>
          Object.values(data).forEach(headline =>
            commit("PUSH_HEADLINE", headline)
          )
        );
    }
  }
};
