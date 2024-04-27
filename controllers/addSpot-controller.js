const { CREATED, INTERNAL_SERVER_ERROR } = require("http-status-codes");
const { Spots } = require("../config");

const add = async (req, res) => {
  try {
    const {
      image,
      touristSpotName,
      countryName,
      location,
      shortDescription,
      averageCost,
      seasonality,
      travelTime,
      totalVisitorsPerYear,
    } = req.body;

    const inputSpot = {
      image,
      touristSpotName,
      countryName,
      location,
      shortDescription,
      averageCost,
      seasonality,
      travelTime,
      totalVisitorsPerYear,
    };

    const newSpot = await Spots.create(inputSpot);

    res.status(CREATED).json({
      success: true,
      message: "Spot added successfully",
      data: newSpot,
    });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  add,
};
