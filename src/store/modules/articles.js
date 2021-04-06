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
      state.items.unshift(payload);
    },
    DELETE_ARTICLE(state, payload) {
      state.items = state.items.filter(({ key }) => key != payload);
    },
    SET_HEADLINES(state, payload) {
      state.headlines = payload;
    },
    PUSH_HEADLINE(state, payload) {
      state.headlines.unshift(payload);
    },
    DELETE_HEADLINE(state, payload) {
      state.headlines = state.headlines.filter(({ key }) => key != payload);
    }
  },

  actions: {
    FETCH_ARTICLES({ commit }) {
      const ref = firebase
        .database()
        .ref("/v1/articles")
        .orderByKey()
        .limitToLast(20);

      ref.on("child_added", snap => {
        const data = snap.toJSON();
        data.key = snap.key;
        commit("PUSH_ARTICLE", data);
      });

      ref.on("child_removed", snap => {
        const key = snap.ref.key;
        commit("DELETE_ARTICLE", key);
      });
    },

    FETCH_HEADLINES({ commit }) {
      const ref = firebase
        .database()
        .ref("/v1/_articles")
        .orderByKey()
        .limitToLast(10);

      ref.on("child_added", snap => {
        const data = snap.toJSON();
        commit("PUSH_HEADLINE", {
          key: snap.key,
          title: data.title,
          source: data.source
        });
      });

      ref.on("child_removed", snap => {
        const key = snap.ref.key;
        commit("DELETE_HEADLINE", key);
      });
    }
  }
};
