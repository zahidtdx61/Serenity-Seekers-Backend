const { Countries, Spots } = require("../config");
const { StatusCodes } = require("http-status-codes");

const get = async (req, res) => {
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

const getCountries = async (req, res) => {
  try {
    const countries = await Countries.find({});

    let data = {};
    for(country of countries){
      const { countryName } = country;
      const spots = await Spots.find({ countryName });
      data[countryName] = spots;
      console.log(countryName, data);
    };

    console.log('res', data);

    return res.status(StatusCodes.OK).json({
      success: true,
      data,
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
    if (!country) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Country not found",
      });
    }

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

module.exports = { get, getCountries, getSpot };
