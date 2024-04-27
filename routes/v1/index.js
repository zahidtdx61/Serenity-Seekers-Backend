const express = require("express");
const router = express.Router();

const InfoController = (req, res) => {
  res.send("Hello from server api");
};

router.get("/info", InfoController);

module.exports = router;
