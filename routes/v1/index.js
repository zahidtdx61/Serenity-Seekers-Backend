const express = require("express");
const router = express.Router();
const {
  InfoController,
  SpotController,
  UserController,
  CountryController,
} = require("./../../controllers");

router.get("/info", InfoController.info);

router.post("/add-spot", SpotController.add);
router.post("/add-spot/:uuid", SpotController.addByUser);

router.post("/add-user", UserController.add);

router.get("/get-spot", SpotController.get);
router.get("/get-spot/:spotId", SpotController.getSingleSpot);
router.get("/get-spot/user/:uuid", SpotController.getSpotByUser);

router.put("/update-spot/:spotId", SpotController.updateSpot);

router.delete("/delete-spot/:spotId", SpotController.deleteSpot);

router.post("/country", CountryController.add);
router.get("/country-list", CountryController.get);
router.get("/countries", CountryController.getCountries);
router.get("/countries/:countryName", CountryController.getSpot);

module.exports = router;
