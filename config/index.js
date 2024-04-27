const DB = require("./mongoose");

module.exports = {
  ServerConfig: require("./serverConfig"),
  Spots: DB.AllSpots,
  UserSpots: DB.UserSpotList,
  Countries: DB.Countries,
};
