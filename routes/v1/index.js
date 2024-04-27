const express = require("express");
const router = express.Router();
const { InfoController, AddSpotController, AddUserController } = require("./../../controllers");


const dummy = (req, res) => {
  res.json({
    success: true,
    message: "API is working fine",
  });
};

router.get("/info", InfoController.info);
router.post("/add-spot", AddSpotController.add);
router.post("/add-spot/:uuid", AddSpotController.addByUser);
router.post("/add-user", AddUserController.add);
router.get("/get-spot")

module.exports = router;
