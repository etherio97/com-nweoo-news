#!/bin/bash -e

npm install
npm run firebase:config
node_modules/.bin/vue-cli-service build
mv dist/ server/
curl -o server/serviceAccount-config.json --url "$FIREBASE_CREDENTIAL_URL"
cd server && npm install
