const { StatusCodes } = require("http-status-codes");
const { UserSpots } = require("../config");

const add = async (req, res) => {
  try {
    const { uuid, email, username } = req.body;
    const userExist = await UserSpots.findOne({ uuid });
    if (userExist) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: true,
        userExist,
        uuid,
        message: "User already added",
      });
    } else {
      const newUser = await UserSpots.create({ uuid, email, username });
      res.status(StatusCodes.CREATED).json({
        success: true,
        newUser,
        uuid,
        message: "User added successfully",
      });
    }
  } catch (error) {}
};

module.exports = { add };
