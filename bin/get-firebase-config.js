const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || process.argv[2];
const FIREBASE_WEBSITE_URL = `${PROJECT_ID}.firebaseapp.com`;
const axios = require("axios").default;
const { existsSync, writeFile } = require("fs");
const { join } = require("path");
const configFile = join(process.cwd(), "src/config/firebaseConfig.json");
const configUrl = `https://${FIREBASE_WEBSITE_URL}/__/firebase/init.json`;
if (existsSync(configFile)) {
  console.log("[OK] Already existed config file at:", configFile);
  process.exit(0);
}
console.log("[-] Downloading config from URL:", configUrl);
axios(configUrl)
  .then(({ data }) =>
    writeFile(configFile, JSON.stringify(data), "utf-8", (err) => {
      if (err) {
        throw new Error("[ERR] Unable write file to", configFile, err.message);
      }
      console.log("[OK] Saved file as", configFile);
    })
  )
  .catch((err) => console.log(`[ERR] Failed to download config`, err.message));
