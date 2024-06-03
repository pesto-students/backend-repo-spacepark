const express = require("express");
const PaymentController = require("../controllers/PaymentController");

const router = express.Router();
router.post("/payment/create-order", PaymentController.createOrder);
router.post("/payment/verify-payment", PaymentController.verifyPayment);
router.get("/payment/listpayment", PaymentController.getAllPayments);

module.exports = router;
