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
  try {
    console.log(req.params);
    const uuid = req.params.uuid;
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
      spotId,
      email,
      username,
    } = req.body;

    const user = await UserSpots.findOne({ uuid });
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

    console.log(user);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    } else {
      const newSpot = await Spots.create(inputSpot);
      const user = await UserSpots.findOne({ uuid });

      const updated = await UserSpots.updateOne(
        { uuid },
        { $push: { spotList: newSpot._id } }
      );

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Spot added successfully",
        data: newSpot,
        updated,
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  add,
  addByUser,
};
