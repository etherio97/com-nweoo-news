const DATABASE_URL =
  // "https://cors-anywhere.herokuapp.com/https://nwe-oo-default-rtdb.firebaseio.com";
  "https://nwe-oo-default-rtdb.firebaseio.com";

function getPublicURL(...path) {
  return `${DATABASE_URL}/v0/public/${path.join("/")}.json`;
}

function getStatisticURL(diff = 0) {
  let dt = new Date();
  let d = 24 * 3600000 * diff;
  dt = new Date(`${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}`);
  dt = new Date(dt.getTime() - d);
  return getPublicURL("statistic", dt.getTime());
}

export { getPublicURL, getStatisticURL };
