const express = require("express");
const router = express.Router();
const { InfoController, AddSpotController } = require("./../../controllers");


const dummy = (req, res) => {
  res.json({
    success: true,
    message: "API is working fine",
  });
};

router.get("/info", InfoController.info);
router.post("/add-spot", AddSpotController.add);

module.exports = router;
