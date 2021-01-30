const router = require("express").Router();
const user = require("../app/user");

router.use("/", (req, res) => {
  user
    .all()
    .then((users) => res.json(users))
    .catch((err) => res.status(err.status || 200).json({ error: err.message }));
});

module.exports = router;
