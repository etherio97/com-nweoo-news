const firebaseConfig = require("./firebaseConfig.json");

const api = process.env.NODE_ENV === 'production' 
              ? 'https://neg.etherio.net/api' /* base url for production */
              : 'http://localhost:3000'; /* base url for development */

export { firebaseConfig, api };
