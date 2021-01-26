const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || process.argv[2];
const FIREBASE_WEBSITE_URL = `${PROJECT_ID}.firebaseapp.com`;
const axios = require("axios").default;
const { existsSync, writeFile } = require("fs");
const { join } = require("path");
const configFile = join(process.cwd(), "src/config/firebaseConfig.json");
const configUrl = `${FIREBASE_WEBSITE_URL}/__/firebase/init.json`;

if (existsSync(configFile)) {
  console.log("[1/1] Already existed config file at:", configFile);
  process.exit(0);
}
if (false) {
  console.log("[1/2] Downloading config from URL:", configUrl);
  axios(configUrl).then(({ data }) =>
    writeFile(configFile, JSON.stringify(data), "utf-8", (err) => {
      if (err) {
        console.log(err);
        throw new Error("[2/2] Unabled config write file to:", configFile);
      }
      console.log("[2/2] Saved config file to:", configFile);
    })
  );
}
