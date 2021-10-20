import axios from "axios";

export default {
  namespaced: true,

  state: {
    items: [],
  },

  mutations: {
    SET_VIDEOS(state, payload) {
      state.items = payload;
    },
  },

  actions: {
    FETCH_VIDEOS({ commit }, payload) {
      return axios.get(`${payload.api}/news/videos`).then(({ data }) =>
        commit(
          "SET_VIDEOS",
          data.sort(
            (a, b) => new Date(b.created_time) - new Date(a.created_time)
          )
        )
      );
    },
  },
};
