const { StatusCodes } = require("http-status-codes");
const { Spots, UserSpots } = require("../config");

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

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Spot added successfully",
      data: newSpot,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


const addByUser = async (req, res) => {
  const uuid = req.params.uuid;
  const { spotId, email, username } = req.body;
  const userExist = await UserSpots.findOne({ uuid });
  if (getOne) {
    res.json({
      success: true,
      getOne,
      uuid,
      message: "Spot already added",
    });
  } else {
    res.json({
      success: false,
      getOne,
      uuid,
      message: "Spot not added",
    });
  }
};

module.exports = {
  add,
  addByUser,
};
