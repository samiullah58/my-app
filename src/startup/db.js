const mongoose = require("mongoose");

module.exports = function () {
  mongoose.connect("mongodb://0.0.0.0/my-app").then(() => {
    console.log("Connected to MongoDB");
  });
};
