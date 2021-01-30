const firebaseConfig = require("./firebase-config.json");

const api =
  process.env.NODE_ENV === "production"
    ? "https://neg.etherio.net/api"
    : "http://localhost:8888/api";

export { firebaseConfig, api };
