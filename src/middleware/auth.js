const jwt = require("jsonwebtoken");
const User = require("../model/user");

module.exports = async function (req, res, next) {
  if (req.headers["x-access-token"]) {
    const accessToken = req.headers["x-access-token"];
    try {
      const { userId } = jwt.verify(accessToken, process.env.JWT_SECRET);
      res.locals.loggedInUser = await User.findById(userId);
      next();
    } catch (error) {
      if (error.message === "jwt expired") {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one",
        });
      }
    }
  } else {
    next();
  }
};
