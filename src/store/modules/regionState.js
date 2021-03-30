import axios from "axios";

const divisions = [
  { id: "yangon", name_mm: "ရန်ကုန်တိုင်းဒေသကြီး", name_en: "Yangon Region" },
  {
    id: "mandalay",
    name_mm: "မန္တလေးတိုင်းဒေသကြီး",
    name_en: "Mandalay Region"
  },
  { id: "naypyitaw", name_mm: "နေပြည်တော်", name_en: "Naypyitaw" },
  {
    id: "tanintharyi",
    name_mm: "တနင်္သာရီတိုင်းဒေသကြီး",
    name_en: "Tanintharyi Region"
  },
  {
    id: "ayeyarwady",
    name_mm: "ဧရာဝတီတိုင်းဒေသကြီး",
    name_en: "Ayeyarwady Region"
  },
  { id: "bago", name_mm: "ပဲခူးတိုင်းဒေသကြီး", name_en: "Bago Region" },
  {
    id: "sagaing",
    name_mm: "စစ်ကိုင်းတိုင်းဒေသကြီး",
    name_en: "Sagaing Region"
  },
  { id: "magway", name_mm: "မကွေးတိုင်းဒေသကြီး", name_en: "Magway Region" },
  { id: "kachin", name_mm: "ကချင်ပြည်နယ်", name_en: "Kachin State" },
  { id: "kayar", name_mm: "ကယားပြည်နယ်", name_en: "Kayar State" },
  { id: "kayin", name_mm: "ကရင်ပြည်နယ်", name_en: "Kayin State" },
  { id: "chin", name_mm: "ချင်းပြည်နယ်", name_en: "Chin State" },
  { id: "mon", name_mm: "မွန်ပြည်နယ်", name_en: "Mon State" },
  { id: "rakhine", name_mm: "ရခိုင်ပြည်နယ်", name_en: "Rakhine State" },
  { id: "shan", name_mm: "ရှမ်းပြည်နယ်", name_en: "Shan State" }
];

export default {
  namespaced: true,

  state: {
    divisions,
    cities: []
  },

  mutations: {
    SET_CITIES(state, payload) {
      state.cities = payload;
    }
  },

  actions: {
    FETCH_CITIES({ commit }, payload) {
      const { api, division_mm, times, ga } = payload;
      const c = divisions.find(c => c["name_mm"] == division_mm);
      if (c) {
        commit("SET_CITIES", []);
        axios
          .get(`${api}/cities/${c.id}?times=${times}&ga=${ga}`)
          .then(({ data }) => {
            commit("SET_CITIES", data);
          });
      }
    }
  },

  getters: {
    divisions_mm({ divisions }) {
      return divisions.map(({ name_mm }) => name_mm);
    },
    divisions_en({ divisions }) {
      return divisions.map(({ name_en }) => name_en);
    }
  }
};
