const asyncWrapper = require("../utils/catchAsync");
const ParkingSpace = require("../models/parkingSpace");
const { Op } = require("sequelize");

// Get all parking spaces, optionally filtered by location
const getAllParkingSpaces = asyncWrapper(async (req, res) => {
  const { location } = req.query;
  let whereClause = {};

  if (location) {
    whereClause.location = {
      [Op.iLike]: `%${location}%` // Use Op.iLike for case-insensitive matching
    };
  }

  const parkingSpaces = await ParkingSpace.findAll({ where: whereClause });
  res.json(parkingSpaces);
});

// Create a new parking space
const createParkingSpace = asyncWrapper(async (req, res) => {
  const newParkingSpace = await ParkingSpace.create(req.body);
  res.status(201).json(newParkingSpace);
});

// Get parking spaces by user ID
const getParkingSpaceByUserId = asyncWrapper(async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  let whereClause = {};
  if (userId) {
    whereClause.userId = userId; // Correctly match userId
  }
  const parkingSpaces = await ParkingSpace.findAll({ where: whereClause });
  console.log(parkingSpaces); // Correct variable name

  if (parkingSpaces.length === 0) {
    return res.status(404).json({ message: "Parking Space not found" });
  }
  res.json(parkingSpaces);
});

// Update a parking space by ID
const updateParkingSpace = asyncWrapper(async (req, res) => {
  const parkingSpaceId = req.params.id;
  const parkingSpace = await ParkingSpace.findByPk(parkingSpaceId);
  if (!parkingSpace) {
    return res.status(404).json({ message: "Parking Space not found" });
  }
  await parkingSpace.update(req.body);
  res.json(parkingSpace);
});

// Delete a parking space by ID
const deleteParkingSpace = asyncWrapper(async (req, res) => {
  const parkingSpaceId = req.params.id;
  const parkingSpace = await ParkingSpace.findByPk(parkingSpaceId);
  if (!parkingSpace) {
    return res.status(404).json({ message: "Parking Space not found" });
  }
  await parkingSpace.destroy();
  res.status(204).end();
});

module.exports = {
  getAllParkingSpaces,
  createParkingSpace,
  getParkingSpaceByUserId,
  updateParkingSpace,
  deleteParkingSpace,
};
