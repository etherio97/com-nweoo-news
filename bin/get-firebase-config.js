const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || process.argv[2];
const FIREBASE_WEBSITE_URL = `${PROJECT_ID}.firebaseapp.com`;
const axios = require("axios").default;
const { existsSync, writeFile } = require("fs");
const { join } = require("path");
const configFile = join(process.cwd(), "src/config/firebase-config.json");
const configUrl = `https://${FIREBASE_WEBSITE_URL}/__/firebase/init.json`;
if (!existsSync(configFile)) {
  console.log("[-] Downloading firebase config from URL:", configUrl);
  axios(configUrl)
    .then(({ data }) =>
      writeFile(configFile, JSON.stringify(data), "utf-8", (err) => {
        if (err) {
          throw new Error(
            "[ERR] Unable write firebase config to",
            configFile,
            err.message
          );
        }
        console.log("[OK] Saved firebase config as", configFile);
      })
    )
    .catch((err) =>
      console.log(`[ERR] Failed to download firebase config`, err.message)
    );
} else {
  console.log("[OK] Already existed firebase config at:", configFile);
}

const serviceAccountUrl = process.env.FIREBASE_CREDENTIAL_URL;
const serviceAccountPath = join(
  process.cwd(),
  "server",
  "serviceAccount-config.json"
);
if (!existsSync(serviceAccountPath)) {
  console.log(
    "[-] Downloading service account credential from URL:",
    serviceAccountUrl
  );
  axios(serviceAccountUrl)
    .then(({ data }) =>
      writeFile(serviceAccountPath, JSON.stringify(data), "utf-8", (err) => {
        if (err) {
          throw new Error(
            "[ERR] Unable write file to",
            configFile,
            err.message
          );
        }
        console.log(
          "[OK] Saved service account credential as",
          serviceAccountPath
        );
      })
    )
    .catch((err) =>
      console.log(
        `[ERR] Failed to download service account credential `,
        err.message
      )
    );
} else {
  console.log(
    "[OK] Already existed service account credential at:",
    serviceAccountPath
  );
}
