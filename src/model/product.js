const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
    trime: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  createAt: {
    type: Date,
  },
  updateAt: {
    type: Date,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
