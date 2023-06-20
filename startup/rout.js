const express = require("express");
const users = require("../routes/user");
const app = express();

module.exports = function (app) {
  app.use(express.json());
  app.use("/v1/users", users);
};
