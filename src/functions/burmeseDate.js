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

function backDate(diff) {
  return new Date(new Date() - (24 * 3600000 * diff));
}

function getDate(date) {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yy = date.getFullYear();
  dd = dd < 10 ? '0' + dd : dd.toString();
  mm = mm < 10 ? '0' + mm : mm.toString();
  return [yy, mm, dd];
}

function formatDate(date) {
  if (!(date instanceof Date)) return date;
  return `${convertMonth(date.getMonth())}လ (${convertDate(date.getDate())})ရက်`;
}

export { convertDate, convertMonth, formatDate, backDate, getDate };
