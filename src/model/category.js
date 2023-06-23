const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortTitle: {
    type: String,
    required: true,
  },
  descriptionTitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  showInMenu: {
    type: Boolean,
    required: true,
  },
  seoTitle: {
    type: String,
    required: true,
  },
  seoDescription: {
    type: String,
    required: true,
  },
  seoKeywords: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
