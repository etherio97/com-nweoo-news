const express = require("express");
const { json } = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const bootstrap = require("./bootstrap");

app.use(json());

bootstrap().then(() => {
  const { existsSync } = require("fs");
  const { resolve } = require("path");
  const dist = resolve(__dirname, "/dist");
  if (process.env.NODE_ENV !== "production") {
    app.use(require("morgan")("dev"));
  }
  existsSync(dist) && app.use(express.static(dist));
  app.use(require("./routes"));
  app.use((req, res) => res.status(404).json({ error: "Not Found" }));
  app.listen(PORT, () => console.log("server is serving on port", PORT));
});
