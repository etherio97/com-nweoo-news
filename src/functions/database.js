import { backDate, getDate } from "./burmeseDate";

const DATABASE_URL =
  "https://etherio-server.herokuapp.com";
// "https://nwe-oo-default-rtdb.firebaseio.com";

function getPublicURL(...path) {
  return `${DATABASE_URL}/v0/public/${path.join("/")}.json`;
}

function getStatisticURL(diff = 0) {
  const date = backDate(diff);
  return getPublicURL("prisoners", getDate(date).join(''));
}

export { getPublicURL, getStatisticURL };
