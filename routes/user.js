const express = require("express");
const { User } = require("../model/user");
const { validate } = require("../validation/user.validate");
const auth = require("../middleware/auth");
const roles = require("../model/user");

const router = express.Router();

// const readGroup = [User.roles.user, User.roles.admin];
const writeGroup = [roles.admin];

router.get("/", async (req, res) => {
  const user = await User.findById(req.user);
  res.send(user);
});

router.post("/", auth({ allowedGroup: writeGroup }), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = await User(req.body, ["name", "email", "password"]);

  user = await user.save();

  res.send(user);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  );
  if (!user) return res.status(404).send("User not found with the given ID");

  res.send(user);
});

router.delete("/:id", async (req, res) => {
  let user = await User.findByIdAndRemove(req.params.id);
  if (!user) return res.status(404).send("user not found with the given ID");
  res.send(user);
});

module.exports = router;
