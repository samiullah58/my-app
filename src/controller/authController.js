const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const decodPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await decodPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    newUser.accessToken = accessToken;
    await newUser.save();
    res.json({ data: newUser, message: "Signup successfuly" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) res.status(400).send("User is not found with the gven email");

    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) res.status(400).send("Password is incorrect");

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

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
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.status(404).send("Something went wrong");

    await User.findByIdAndUpdate(user._id, { accessToken: null });
    res.status(200).send("successfuly lougout");
  } catch (error) {
    res.send(error);
  }
};

module.exports.authController = { signup, login, logout };
