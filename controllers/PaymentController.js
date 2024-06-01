const asyncWrapper = require("../utils/catchAsync");
const Payment = require("./../models/PaymentModel");
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay instance with your keys
const razorpayInstance = new Razorpay({
  key_id: process.env.KEY_ACCESS_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = asyncWrapper(async (req, res) => {
  const { amount, currency, receipt, userId } = req.body;

  
  console.log("Payment", req.body);
  // Step 1: Create initial payment entry
  const paymentEntry = await Payment.create({
    userId,
    status: 'pending',
    price: amount / 100, // Assuming amount is in paise
    request: req.body,
  });

  try {
    const options = {
      amount: amount, // amount in the smallest currency unit (e.g., paise for INR)
      currency: currency,
      receipt: receipt,
    };
    const razorpayOrder = await razorpayInstance.orders.create(options);

    // Step 2: Update payment entry with Razorpay order ID
    const data = await paymentEntry.update({ orderID: razorpayOrder.id, response: razorpayOrder });
  
    console.log(data, 'razorpayOrder', razorpayOrder);
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    await paymentEntry.update({ status: 'failed', response: { error: error.message } });
    res.status(500).json({ error: 'An error occurred while creating the order' });
  }
});

const getAllPayments = asyncWrapper(async (req, res) => {
  try {
    // Fetch all payments from the database
    const payments = await Payment.findAll();
    res.json(payments); // Send the payments as a JSON response
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'An error occurred while fetching payments' });
  }
});

const verifyPayment = asyncWrapper(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const paymentEntry = await Payment.findOne({ where: { orderID: razorpay_order_id } });
  if (!paymentEntry) {
    return res.status(404).json({ message: "Payment entry not found" });
  }

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto.createHmac('sha256', razorpayInstance.key_secret)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    await paymentEntry.update({
      status: 'paid',
      response: {
        ...paymentEntry.response,
        razorpay_payment_id,
        razorpay_signature,
      }
    });
    res.json({ success: true });
  } else {
    await paymentEntry.update({
      status: 'failed',
      response: {
        ...paymentEntry.response,
        error: 'Invalid signature',
      }
    });
    res.json({ success: false });
  }
});

const logFailedPayment = asyncWrapper(async (req, res) => {
  const { orderId, error } = req.body;

  const paymentEntry = await Payment.findOne({ where: { orderID: orderId } });
  if (!paymentEntry) {
    return res.status(404).json({ message: "Payment entry not found" });
  }

  await paymentEntry.update({
    status: 'failed',
    response: {
      ...paymentEntry.response,
      error,
    }
  });

  res.json({ success: true });
});

// const getAllPayments = asyncWrapper(async (req, res) => {
//   const payments = await Payment.findAll();
//   res.json(payments);
// });

const getPaymentById = asyncWrapper(async (req, res) => {
  const paymentId = req.params.id;
  const payment = await Payment.findByPk(paymentId);
  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }
  res.json(payment);
});

const updatePayment = asyncWrapper(async (req, res) => {
  const paymentId = req.params.id;
  const payment = await Payment.findByPk(paymentId);
  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }
  await payment.update(req.body);
  res.json(payment);
});

const deletePayment = asyncWrapper(async (req, res) => {
  const paymentId = req.params.id;
  const payment = await Payment.findByPk(paymentId);
  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }
  await payment.destroy();
  res.status(204).end();
});

module.exports = {
  createOrder,
  verifyPayment,
  logFailedPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
