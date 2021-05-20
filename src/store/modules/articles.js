import axios from "axios";

export default {
  namespaced: true,

  state: {
    items: [],
    headlines: []
  },

  mutations: {
    PUSH_ARTICLE(state, payload) {
      state.items.push(payload);
    },
    PUSH_HEADLINE(state, payload) {
      state.headlines.push(payload);
    }
  },

  actions: {
    FETCH_ARTICLES({ state, commit }, payload) {
      if (state.items.length) {
        return;
      }
      return axios
        .get(`${payload.api}/news/articles?limit=11`)
        .then(({ data }) =>
          data.forEach(article => commit("PUSH_ARTICLE", article))
        );
    },

    MORE_ARTICLES({ state, commit }, payload) {
      let latest = state.items[state.items.length - 1];
      return axios
        .get(`${payload.api}/news/articles?limit=10&paging=${latest.article_id}`)
        .then(({ data }) =>
          data.forEach(article => commit("PUSH_ARTICLE", article))
        );
    },

    FETCH_HEADLINES({ state, commit }, payload) {
      if (state.items.length) {
        return;
      }
      return axios
        .get(`${payload.api}/news/headlines?limit=10`)
        .then(({ data }) => data.reverse()
          .forEach(headline => commit("PUSH_HEADLINE", headline))
        );
    }
  }
};
