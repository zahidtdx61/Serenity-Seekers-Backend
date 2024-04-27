const { StatusCodes } = require("http-status-codes");

const info = (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "API is working fine",
  });
};

module.exports = {
  info,
};
