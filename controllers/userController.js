const asyncWrapper = require("./../utils/catchAsync");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const ParkingSpace = require('./../models/parkingSpace')
const User = require('./../models/user');
const ServericesModel = require('../controllers/ServicesController')

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.findAll();
  console.log(users, 'Users -------------------');
  return res.json(users);
});

const generateToken = (user) => {
  const payload = { id: user.id, email: user.email, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

const createUser = asyncWrapper(async (req, res, next) => {
  try {
    const { username, email, password, mobile, DateOfBirth } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already in use' });
    }
    const role = 'user';
    const status = 'active';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      mobile,
      role,
      status,
      DateOfBirth,
    });

    const token = generateToken(newUser);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

const createParkingSpaceOwner = asyncWrapper(async (req, res, next) => {
  const { username, email, password, mobile, DateOfBirth, location, services, numberOfSpaces } = req.body;

  // Validate input data
  if (!username || !email || !password || !location || !services || !numberOfSpaces) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if the email already exists
  const existingUserByEmail = await User.findOne({ where: { email } });
  if (existingUserByEmail) {
    return res.status(409).json({ message: 'Email already in use' });
  }

  // Check if the username already exists
  const existingUserByUsername = await User.findOne({ where: { username } });
  if (existingUserByUsername) {
    return res.status(410).json({ message: 'Username already in use' });
  }

  // Create a new user
  const role = 'parkAdmin';
  const status = 'active';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  let newUser;
  try {
    newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      mobile,
      role,
      status,
      DateOfBirth,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create user', error: error.message });
  }

  // Generate a token for the new user
  const token = generateToken(newUser);

  // Return the newly created user, parking space, services, and token
  res.status(201).json({
    user: newUser,
    token,
    status: 201
  });
});





const getUserById = asyncWrapper(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

const updateUser = asyncWrapper(async (req, res) => {
  try {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const deleteUser = asyncWrapper(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  await user.destroy();
  res.status(204).end();
});

// Generate QR code
const generateQRCode = async (req, res) => {

  try {
    const userId = req.params.id;

    console.log(`Received userId: ${userId}`);
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(`Found user: ${JSON.stringify(user)}`);
    const url=`${process.env.WEBAPP_URL}/activeUsers/${userId}`;
    const qrCode = await QRCode.toDataURL(url);
    console.log(qrCode, 'QQQQQQQQQQQQQQQQQQQQQQQQQQ');
    res.json({ qrCode });
  } catch (error) {
    console.log(error, 'Error  ------------------');
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  createParkingSpaceOwner,
  generateQRCode
};
