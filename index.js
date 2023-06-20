const express = require("express");

const app = express();

require("../src/startup/rout")(app);
require("../src/startup/db")();

app.get("/", () => {
  console.log("Home page of this app");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
