const express = require("express");
const bodyParser = require("body-parser");
const { userRouter } = require("./src/routes/user");
const { categoryRouter } = require("./src/routes/category");
const path = require("path");

const app = express();

require("dotenv").config({
  path: path.join(__dirname, "./.env"),
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("This is my HOME Page");
});
app.use("/", userRouter);
app.use("/", categoryRouter);
require("./src/startup/db")();

console.log(process.env.NODE_ENV);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is listening on Port:", port);
});
