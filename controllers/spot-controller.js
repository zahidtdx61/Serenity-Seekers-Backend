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

const get = async (req, res) => {
  try {
    const spots = await Spots.find();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Spots retrieved successfully",
      data: spots,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getSingleSpot = async (req, res) => {
  try {
    const spotId = req.params.spotId;
    const spot = await Spots.findById(spotId);

    if (!spot) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Spot not found",
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Spot retrieved successfully",
      data: spot,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }

}

module.exports = {
  add,
  addByUser,
  get,
};
