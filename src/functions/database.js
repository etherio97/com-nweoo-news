import { backDate, getDate } from "./burmeseDate";

const DATABASE_URL = "https://api.nweoo.com";
// "https://etherio-server.herokuapp.com"
// "https://nwe-oo-default-rtdb.firebaseio.com"

function getURL(...path) {
  return `${DATABASE_URL}/${path.join("/")}`;
}

function getPublicURL(...path) {
  return getURL("v0/public", ...path) + ".json";
}

function getStatisticURL(diff = 0) {
  const date = backDate(diff);
  return getPublicURL("prisoners", getDate(date).join(""));
}

export { getURL, getPublicURL, getStatisticURL };
