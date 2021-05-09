import axios from "axios";
import firebase from "firebase/app"

export default {
  namespaced: true,
  state: {
    reasons: [
      "မှားယွင်းသောသတင်းအချက်အလက်များ",
      "ရိုင်းစိုင်းသောစကားသုံးများ",
      "ပုပ်ခတ်ပြောဆိုထားသောစကားလုံးများ",
      "အကြောင်းအရာမသက်ဆိုင်ပါ",
      "အခြား"
    ],
    reports: []
  },

  mutations: {
    SET_REPORTS(state, payload) {
      state.reports = payload;
    },

    SET_REPORT(state, payload) {
      state.reports.unshift(payload);
    }
  },

  actions: {
    UPDATE_REPORTS({ commit }, payload) {
      // if (payload.network_mode === "api") {
      return axios(`${payload.url}/report?limit=20`)
        .then(({ data }) =>
          commit("SET_REPORTS", data)
        );
      // }
      return firebase.
        database()
        .ref('/v1/reports')
        .orderByChild('timestamp')
        .limitToLast(20)
        .on(snap =>
          commit('SET_REPORT', snap.toJSON())
        );
    }
  }
};
