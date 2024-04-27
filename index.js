const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes");
const { ServerConfig } = require("./config");

const PORT = ServerConfig.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
