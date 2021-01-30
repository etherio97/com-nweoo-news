#!/bin/bash -e

npm install
npm run firebase:config
npm run build
mv -R ./dist ./server
