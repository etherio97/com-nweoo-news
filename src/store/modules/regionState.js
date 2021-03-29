const divisions = [
  { id: 1, name_mm: "ရန်ကုန်", name_en: "Yangon", type: "region", },
  { id: 2, name_mm: "မန္တလေး", name_en: "Mandalay", type: "region", },
  { id: 3, name_mm: "နေပြည်တော်", name_en: "Naypyitaw", type: null, },
  { id: 4, name_mm: "တနင်္သာရီ", name_en: "Tanintharyi", type: "region", },
  { id: 5, name_mm: "ဧရာဝတီ", name_en: "Ayeyarwady", type: "region", },
  { id: 6, name_mm: "ပဲခူး", name_en: "Bago", type: "region", },
  { id: 7, name_mm: "စစ်ကိုင်း", name_en: "Sagaing", type: "region", },
  { id: 8, name_mm: "မကွေး", name_en: "Magwe", type: "region", },
  { id: 9, name_mm: "ကချင်", name_en: "Kachin", type: "state", },
  { id: 10, name_mm: "ကယား", name_en: "Kayar", type: "state", },
  { id: 11, name_mm: "ကရင်", name_en: "Kayin", type: "state", },
  { id: 12, name_mm: "ချင်း", name_en: "Chin", type: "state", },
  { id: 13, name_mm: "မွန်", name_en: "Mon", type: "state", },
  { id: 14, name_mm: "ရခိုင်", name_en: "Rakhine", type: "state", },
  { id: 15, name_mm: "ရှမ်း", name_en: "Shan", type: "state", }];

export default {
  namespaced: true,

  state: {
    divisions,
  },

  getters: {
    divisions_mm({ divisions }) {
      return divisions.map(({
        name_mm,
        type
      }) => `${name_mm}${type === 'region' && 'တိုင်းဒေသကြီး' || type === 'state' && 'ပြည်နယ်' || ''}`);
    },
    divisions_en({ divisions }) {
      return divisions.map(({ name_en }) => name_en);
    },
  }
};
