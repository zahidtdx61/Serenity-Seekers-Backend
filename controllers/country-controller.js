const { Countries } = require("../config");

const getCountries = async (req, res) => {
  try {
    const countries = await Countries.find({});
    res.json({
      success: true,
      countries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = { getCountries };
