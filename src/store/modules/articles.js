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
      if (payload.network_mode === "api") {
        return axios
          .get(`${payload.api}/articles?limit=20`)
          .then(({ data }) =>
            Object.values(data).forEach(article =>
              commit("PUSH_ARTICLE", article)
            )
          );
      }
      return firebase
        .database()
        .ref("/v1/articles")
        .orderByChild("timestamp")
        .limitToLast(20)
        .on("child_added", snap => {
          commit("PUSH_ARTICLE", snap.toJSON());
        });
    },

    FETCH_HEADLINES({ commit }, payload) {
      if (payload.network_mode === "api") {
        return axios
          .get(`${payload.api}/news/headlines?limit=10`)
          .then(({ data }) =>
            Object.values(data).forEach(headline =>
              commit("PUSH_HEADLINE", headline)
            )
          );
      }
      return firebase
        .database()
        .ref("/v1/_articles")
        .orderByChild("timestamp")
        .limitToLast(10)
        .on("child_added", snap => {
          const { title, source } = snap.toJSON();
          commit("PUSH_HEADLINE", { title, source });
        });
    }
  }
};
