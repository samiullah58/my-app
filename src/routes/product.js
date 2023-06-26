const express = require("express");
const router = express.Router();
const { productController } = require("../controller/productController");
const { userController } = require("../controller/userController");
const auth = require("../middleware/auth");

router.post(
  "/product",
  auth,
  userController.allowIfLoggedin,
  productController.createProduct
);
router.put(
  "/product/:id",
  auth,
  userController.allowIfLoggedin,
  userController.grantAccess("updateAny", "User"),
  productController.updateProduct
);

module.exports.productRouter = router;
