const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;
const app = express();

__webpack_public_path__ = process.env.ASSET_PATH;
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(require("./routes/api"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});