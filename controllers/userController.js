const asyncWrapper = require("./../utils/catchAsync");
const User = require("./../models/user");

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

const createUser = asyncWrapper(async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
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
  const userId = req.params.id;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  await user.update(req.body);
  res.json(user);
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

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
