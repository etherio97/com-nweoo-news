const express = require("express");
const { json } = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const bootstrap = require("./bootstrap");

app.use(json());

bootstrap().then(() => {
  const { resolve } = require("path");
  if (process.env.NODE_ENV !== "production") {
    app.use(require("morgan")("dev"));
  } else {
    app.use(express.static(resolve(__dirname, "/dist")));
  }
  // register routing
  app.use(require("./routes"));
  // [404] route not found
  app.use((req, res) => res.status(404).json({ error: "Not Found" }));
  app.listen(PORT, () => console.log("server is serving on port", PORT));
});
