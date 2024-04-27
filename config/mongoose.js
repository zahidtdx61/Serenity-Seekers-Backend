const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const URL = `${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}`;

mongoose.connect(URL);

const SpotsSchema = new mongoose.Schema({
  image: String,
  touristSpotName: String,
  countryName: String,
  location: String,
  shortDescription: String,
  averageCost: String,
  seasonality: String,
  travelTime: String,
  totalVisitorsPerYear: String,
});

const UserSpotListSchema = new mongoose.Schema({
  uuid: String,
  email: String,
  username: String,
  spotList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AllSpots",
    },
  ],
});

const CountriesSchema = new mongoose.Schema({
  countryName: String,
  countryDescription: String,
  countryImage: String,
});

const AllSpots = mongoose.model("AllSpots", SpotsSchema);
const UserSpotList = mongoose.model("UserSpotList", UserSpotListSchema);
const Countries = mongoose.model("Countries", CountriesSchema);

const DbModels = {
  AllSpots,
  UserSpotList,
  Countries,
};

module.exports = DbModels;
