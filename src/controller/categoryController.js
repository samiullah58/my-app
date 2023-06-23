const Category = require("../model/category");
const { validateCategory } = require("../validation/category.validate");

const createCategory = async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const category = await Category.create(req.body);

  await category.save();

  res.send(category);
};

const getCategories = async (req, res) => {
  const category = await Category.find({});
  res.send(category);
};

const getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.send(category);
};

const updateCategory = async (req, res) => {
  let category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      shortTitle: req.body.shortTitle,
      descriptionTitle: req.body.descriptionTitle,
      image: req.body.image,
      banner: req.body.banner,
      slug: req.body.slug,
      showInMenu: req.body.showInMenu,
      seoTitle: req.body.seoTitle,
      seoDescription: req.body.seoDescription,
      seoKeywords: req.body.seoKeywords,
    },
    {
      new: true,
    }
  );
  if (!category) res.status(404).send("user not found with the given ID");

  // await category.save();
  res.send(category);
};

const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  res.send(category);
};

module.exports.categoryController = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
