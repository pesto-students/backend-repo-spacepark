const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.get("/qrcode/:userId", authmiddleware, authController.getQRCode);
router.post("/login", authController.login);

module.exports = router;
