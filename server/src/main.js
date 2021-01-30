const express = require("express");
const { json } = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const bootstrap = require("./bootstrap");

app.use(json());

bootstrap().then(() => {
  const { existsSync } = require("fs");
  const { join, dirname } = require("path");
  const dist = join(dirname(__dirname), "dist");
  if (process.env.NODE_ENV !== "production") {
    app.use(require("morgan")("dev"));
  }
  console.log("static dir:", dist);
  existsSync(dist) && app.use(express.static(dist));
  app.use(require("./routes"));
  app.use((req, res) => res.sendFile(join(dist, "index.html")));
  app.listen(PORT, () => console.log("server is serving on port", PORT));
});
