require("dotenv").config();

module.exports = async function bootstrap() {
  const { join, dirname } = require("path");
  const { existsSync, writeFileSync } = require("fs");
  const fetch = require("isomorphic-fetch");
  const credentialURL = process.env.FIREBASE_CREDENTIAL_URL;
  const databaseURL = process.env.FIREBASE_DATABASE_URL;
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
  const credentialPath = join(
    dirname(dirname(__dirname)),
    "serviceAccount-config.json"
  );
  const admin = require("firebase-admin");
  if (!existsSync(credentialPath)) {
    if (!credentialURL) {
      throw new Error(
        "required environment variable `FIREBASE_CREDENTIAL_URL`"
      );
    }
    const response = await fetch(credentialURL);
    writeFileSync(credentialPath, await response.text(), "utf-8");
  }
  if (admin.apps.length) {
    return admin.app();
  }
  const serviceAccount = require(credentialPath);
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL,
    storageBucket,
  });
};
