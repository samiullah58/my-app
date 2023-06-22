const { roles } = require("../roles");
const User = require("../model/user");

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users);
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) res.status(404).send("user not found with the given ID");

  res.send(user);
};

const updateUser = async (req, res) => {
  let user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  );
  if (!user) res.status(404).send("user not found with the given ID");

  res.send(user);
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) res.status(404).send("user not found with the given ID");
  res.send("User deleted");
};

const grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

const allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user)
      return res.status(401).json({
        error: "You need to be logged in to access this route",
      });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.userController = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  grantAccess,
  allowIfLoggedin,
};
