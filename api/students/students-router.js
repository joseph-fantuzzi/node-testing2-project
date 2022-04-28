const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json({ router: "up" });
});

module.exports = router;
