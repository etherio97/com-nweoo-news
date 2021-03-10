import burmeseNumber from "./burmeseNumber";

const burmeseMonths = [
  "ဇန်နဝါရီ",
  "ဖေဖော်ဝါရီ",
  "မတ်",
  "ဧပြီ",
  "မေ",
  "ဇွန်",
  "ဇူလိုင်",
  "သြဂုတ်",
  "စက်တင်ဘာ",
  "နိုဝင်ဘာ",
  "ဒီဇင်ဘာ",
];

function convertMonth(n) {
  return burmeseMonths[parseInt(n)] || m;
}

function convertDate(n) {
  return (n < 10 ? "၀" : "") + burmeseNumber(n);
}

export { convertDate, convertMonth };
