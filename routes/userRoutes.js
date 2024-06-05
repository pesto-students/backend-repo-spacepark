// userRoutes.js
const express = require("express");
const userController = require("./../controllers/userController");

const router = express.Router();

router
  .get("/", userController.getAllUsers)
  .post("/", userController.createUser);

router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
