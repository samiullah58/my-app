const { User } = require("../model/user");
module.exports = function (options) {
  let user = User();
  console.log(user);
  user.permission.forEach((permission) => {
    if (options.allowedGroup.indexOf(permission)) {
      // if authenticated
      return next();
    }
  });
  //   could not authenticate at this point
  return next(errorHandler); // throw a error or handle it way you want
};
