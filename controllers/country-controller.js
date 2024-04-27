const { get } = require("mongoose");
const { Countries, Spots } = require("../config");
const { StatusCodes } = require("http-status-codes");

const getCountries = async (req, res) => {
  try {
    const countries = await Countries.find({});
    return res.status(StatusCodes.OK).json({
      success: true,
      countries,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const getSpot = async (req, res) => {
  try {
    const { countryName } = req.params;
    const country = await Countries.findOne({ countryName });
    const spots = await Spots.find({ countryName });

    return res.status(StatusCodes.OK).json({
      success: true,
      countryName,
      data: spots,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getCountries, getSpot };
