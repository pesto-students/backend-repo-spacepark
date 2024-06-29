const User = require("../models/user"); // Assuming your User model is defined here
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("./../utils/catchAsync");
const { validationResult } = require("validator");

require("dotenv").config();

exports.signup = asyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const qrCodeId = email + new Date().getTime();

  //need to update this based on sequlize and add qrcode is field
  const user = new User({ name, email, password: hashedPassword, qrCodeId });

  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    data: qrCodeId,
  });

  // Upload QR code to Cloudinary
  const qrCodeUrl = await uploadQRCodeToCloudinary(qrCode);

  // Save QR code URL in the user document
  user.qrCodeUrl = qrCodeUrl;

  await user.save();
  res.status(201).json({ message: "User created successfully", qrCodeUrl });
});

exports.login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

exports.getQRCode = asyncWrapper(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ qrCodeUrl: user.qrCodeUrl });
});
