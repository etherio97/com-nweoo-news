const regionAndStates = [
  {
    name: "Yangon Region",
    alt: "Yangon",
    capital: "Yangon",
    abbr: "YGN",
    region: true,
    state: false,
  },
  {
    name: "Mandalay Region",
    alt: "Mandalay",
    capital: "Mandalay",
    abbr: "MDY",
    region: true,
    state: false,
  },
  {
    name: "Naypyitaw",
    alt: "Naypyitaw",
    capital: "Naypyitaw",
    abbr: "NPW",
    region: false,
    state: false,
  },
  {
    name: "Sagaing Region",
    alt: "Sagaing",
    capital: "Sagaing",
    abbr: "SGG",
    region: true,
    state: false,
  },
  {
    name: "Bago Region",
    alt: "Bago",
    capital: "Mone Ywar",
    abbr: "BGO",
    region: true,
    state: false,
  },
  {
    name: "Magway Region",
    alt: "Magway",
    capital: "Magway",
    abbr: "MGY",
    region: true,
    state: false,
  },
  {
    name: "Ayeyarwady Region",
    alt: "Ayeyarwady",
    capital: "Pathein",
    abbr: "MGY",
    region: true,
    state: false,
  },
  {
    name: "Tanintharyi Region",
    alt: "Tanintharyi",
    capital: "Dawei",
    abbr: "BGO",
    region: true,
    state: false,
  },
  {
    name: "Kachin State",
    alt: "Kachin",
    capital: "Myitkyina",
    abbr: "KCN",
    region: false,
    state: true,
  },
  {
    name: "Kayah State",
    alt: "Kayah",
    capital: "Loikaw",
    abbr: "KYH",
    region: false,
    state: true,
  },
  {
    name: "Kayin State",
    alt: "Kayin",
    capital: "Hpa-An",
    abbr: "KYH",
    region: false,
    state: true,
  },
  {
    name: "Chin State",
    alt: "Chin",
    capital: "Hakha",
    abbr: "CHN",
    region: false,
    state: true,
  },
  {
    name: "Mon State",
    alt: "Mon",
    capital: "Mawlamyine",
    abbr: "MON",
    region: false,
    state: true,
  },
  {
    name: "Rakhine State",
    alt: "Rakhine",
    capital: "Sittwe",
    abbr: "RKE",
    region: false,
    state: true,
  },
  {
    name: "Shan State",
    alt: "Shan",
    capital: "Taunggyi",
    abbr: "KYH",
    region: false,
    state: true,
  },
];

export default async function fetchRegionsAndStates() {
  return regionAndStates;
}
