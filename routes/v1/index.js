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

router.post("/add-spot", SpotController.add);
router.post("/add-spot/:uuid", SpotController.addByUser);

router.post("/add-user", UserController.add);

router.get("/get-spot", )

module.exports = router;
