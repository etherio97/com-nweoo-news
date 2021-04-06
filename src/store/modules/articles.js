import axios from "axios";
import firebase from "firebase/app";

export default {
  namespaced: true,

  state: {
    items: [],
    headlines: []
  },

  mutations: {
    SET_ARTICLES(state, payload) {
      state.items = payload;
    },
    PUSH_ARTICLE(state, payload) {
      if (state.items.findIndex(({ id }) => id == payload.id) > -1) {
        return;
      }
      state.items.unshift(payload);
    },
    SET_HEADLINES(state, payload) {
      state.headlines = payload;
    },
    PUSH_HEADLINE(state, payload) {
      if (state.headlines.findIndex(({ id }) => id == payload.id) > -1) {
        return;
      }
      state.headlines.unshift(payload);
    }
  },

  actions: {
    FETCH_ARTICLES({ commit }, payload) {
      if (payload.network_mode === "api") {
        return axios
          .get(`${payload.api}/articles?limit=20`)
          .then(({ data }) => commit("SET_ARTICLES", data));
      }
      return firebase
        .database()
        .ref("/v1/articles")
        .orderByChild("timestamp")
        .limitToLast(20)
        .on("child_added", snap => {
          const data = snap.toJSON();
          commit("PUSH_ARTICLE", data);
        });
    },

    FETCH_HEADLINES({ commit }, payload) {
      if (payload.network_mode === "api") {
        return axios
          .get(`${payload.api}/news/headlines?limit=10`)
          .then(({ data }) => commit("SET_HEADLINES", Object.values(data)));
      }
      return firebase
        .database()
        .ref("/v1/_articles")
        .orderByKey()
        .limitToLast(10)
        .on("child_added", snap => {
          const data = snap.toJSON();
          commit("PUSH_HEADLINE", {
            title: data.title,
            source: data.source
          });
        });
    }
  }
};
