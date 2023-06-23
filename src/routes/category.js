const express = require("express");
const router = express.Router();
const { categoryController } = require("../controller/categoryController");
const auth = require("../middleware/auth");
const { userController } = require("../controller/userController");

router.post("/category", categoryController.createCategory);
router.get(
  "/category",
  auth,
  userController.allowIfLoggedin,
  userController.grantAccess("readAny", "User"),
  categoryController.getCategories
);
router.get(
  "/category/:id",
  auth,
  userController.allowIfLoggedin,
  categoryController.getCategory
);
router.put(
  "/category/:id",
  auth,
  userController.allowIfLoggedin,
  userController.grantAccess("updateAny", "User"),
  categoryController.updateCategory
);
router.delete(
  "/category/:id",
  auth,
  userController.allowIfLoggedin,
  userController.grantAccess("deleteAny", "User"),
  categoryController.deleteCategory
);

module.exports.categoryRouter = router;
