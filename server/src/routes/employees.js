const router = require("express").Router();
const employee = require("../app/employee");

router.get("/", (req, res) => {
  const results = [];
  employee
    .all()
    .then((employees) => {
      Object.entries(employees).forEach(([id, value]) =>
        results.push({ id, ...value })
      );
    })
    .then(() => res.json(results.reverse()))
    .catch((err) =>
      res.status(err.status || 200).json({
        error: err.message,
      })
    );
});

router.post("/", (req, res) => {
  const { id, name } = req.body;
  employee
    .create({ id, name })
    .then(() => res.json({ id, name }))
    .catch((err) =>
      res.status(err.status || 200).json({
        error: err.message,
      })
    );
});

router.delete("/", (req, res) => {
  const { id } = req.body;
  employee
    .delete(id)
    .then(() => res.status(201).json({ id }))
    .catch((err) =>
      res.status(err.status || 200).json({
        error: err.message,
      })
    );
});

module.exports = router;
