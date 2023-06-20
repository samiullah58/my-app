const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 20,
    },
    permission: ["get", "post", "put", "delete"],
  },
  { timestamps: true }
);

const roles = {
  admin: "admin",
  user: "user",
};

const User = new mongoose.model("User", userSchema);

exports.User = User;
exports.roles = roles;
