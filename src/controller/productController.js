const Product = require("../model/product");
const { create } = require("../model/user");

const createProduct = async (req, res, next) => {
  try {
    const { error } = req.body;
    if (error) res.status(400).send(error.details[0].message);

    const { name, price, cost } = req.body;

    const newProduct = new Product({
      name,
      price,
      cost,
      createAt: new Date(),
    });
    await newProduct.save();
    res.json({ data: newProduct, message: "Product successfuly created" });
  } catch (error) {
    next(error.message);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        cost: req.body.cost,
        createAt: req.body.createAt,
        updateAt: new Date(),
      },
      { new: true }
    );
    if (!newProduct) res.status(404).send("Product not found");
    res.send(newProduct);
  } catch (error) {
    next(error.message);
  }
};

module.exports.productController = { createProduct, updateProduct };
