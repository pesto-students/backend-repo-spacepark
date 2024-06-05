const User = require("../models/user"); // Assuming your User model is defined here
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("./../utils/catchAsync");
const { validationResult } = require("validator");

require("dotenv").config();

exports.signup = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation (assuming you're using validator)

  // Check for existing email
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  res.status(201).json({ message: "User created successfully" });
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
