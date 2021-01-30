#!/bin/bash -e

npm install
npm run firebase:config
node_modules/.bin/vue-cli-service build
mv dist/ server/
cd server && npm install
