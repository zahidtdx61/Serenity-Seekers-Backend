const { StatusCodes } = require("http-status-codes");
const { Spots, UserSpots, Countries } = require("../config");

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
    const country = await Countries.findOne({ countryName });

    if (country) {
      await Countries.updateOne(
        { countryName },
        { $push: { spotList: newSpot._id } }
      );
    } else {
      await Countries.create({ countryName, spotList: [newSpot._id] });
    }

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

    const user = await UserSpots.findOne({ uuid });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    } else {
      const newSpot = await Spots.create(inputSpot);
      const country = await Countries.findOne({ countryName });

      if (country) {
        await Countries.updateOne(
          { countryName },
          { $push: { spotList: newSpot._id } }
        );
      } else {
        await Countries.create({ countryName, spotList: [newSpot._id] });
      }
      
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
};

const getSpotByUser = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const user = await UserSpots.findOne({ uuid });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    const spots = await Spots.find({ _id: { $in: user.spotList } });

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

const updateSpot = async (req, res) => {
  try {
    const spotId = req.params.spotId;
    const {
      uuid,
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

    const spot = await Spots.findById(spotId);
    if (!spot) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Spot not found",
      });
    }

    const user = await UserSpots.findOne({ uuid });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    } else if (!user.spotList.includes(spotId)) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Spot not found in user's spot list",
      });
    }

    const updated = await Spots.updateOne({ _id: spotId }, inputSpot);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Spot updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteSpot = async (req, res) => {
  try {
    const spotId = req.params.spotId;
    const { uuid } = req.body;

    const spot = await Spots.findById(spotId);
    if (!spot) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Spot not found",
      });
    }

    const user = await UserSpots.findOne({ uuid });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    } else if (!user.spotList.includes(spotId)) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Spot not found in user's spot list",
      });
    }

    await Spots.deleteOne({ _id: spotId });
    await UserSpots.updateOne({ uuid }, { $pull: { spotList: spotId } });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Spot deleted successfully",
    });
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
  get,
  getSingleSpot,
  getSpotByUser,
  updateSpot,
  deleteSpot,
};
