// userRoutes.js
const express = require("express");
const userController = require("./../controllers/userController");
const checkAction = require('../middlewares/checkAction')

const router = express.Router();
console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
router.get("/", userController.getAllUsers)
router.post("/", checkAction, (req, res) => {

    if (req.hasAction) {
      userController.createParkingSpaceOwner(req, res);
    } else {
      userController.createUser(req, res);
    }
  });
router.get("/qrcode/:id", userController.generateQRCode);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
