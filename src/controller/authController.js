const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const {
  validateSignup,
  validateLogin,
  validateLogout,
} = require("../validation/user.validate");

const decodPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const signup = async (req, res, next) => {
  try {
    const { error } = validateSignup(req.body);
    if (error) res.status(400).send(error.details[0].message);
    const { name, email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (user)
      res.status(400).send("this user is already registered please login");
    const hashedPassword = await decodPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    const accessToken = jwt.sign(
      { userId: newUser._id, name: newUser.name, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    newUser.accessToken = accessToken;
    await newUser.save();
    res.json({ data: newUser, message: "Signup successfuly" });
  } catch (error) {
    next(error.message);
  }
};

const login = async (req, res, next) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) res.status(400).send(error.details[0].message);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) res.status(400).send("User is not found with the gven email");

    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) res.status(400).send("Password is incorrect");

    const accessToken = jwt.sign(
      { userId: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    await User.findByIdAndUpdate(user._id, { accessToken });
    res
      .status(200)
      .json({ data: { email: user.email, role: user.role }, accessToken });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { error } = validateLogout(req.body);
    if (error) res.status(400).send(error.details[0].message);
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.status(404).send("Something went wrong");

    await User.findByIdAndUpdate(user._id, { accessToken: null });
    res.status(200).send("successfuly lougout");
  } catch (error) {
    next(error.message);
  }
};

module.exports.authController = { signup, login, logout };
