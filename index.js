const express = require("express");
const bodyParser = require("body-parser");
const router = require("./src/routes/route");
const path = require("path");

const app = express();

require("dotenv").config({
  path: path.join(__dirname, "./.env"),
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

require("./src/startup/db")();

app.get("/", async (req, res) => {
  res.send("This is my HOME Page");
});

app.use("/", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is listening on Port:", port);
});
