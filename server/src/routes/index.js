const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/employees", require("./employees"));

module.exports = router;
