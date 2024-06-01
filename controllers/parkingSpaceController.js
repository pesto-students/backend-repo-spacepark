const asyncWrapper = require("../utils/catchAsync");
const ParkingSpace = require("../models/parkingSpace");

const getAllParkingSpaces = asyncWrapper(async (req, res) => {
  const parkingSpaces = await ParkingSpace.findAll();
  res.json(parkingSpaces);
});

const createParkingSpace = asyncWrapper(async (req, res) => {
  const newParkingSpace = await ParkingSpace.create(req.body);
  res.status(201).json(newParkingSpace);
});

const getParkingSpaceById = asyncWrapper(async (req, res) => {
  const parkingSpaceId = req.params.id;
  const parkingSpace = await ParkingSpace.findByPk(parkingSpaceId);
  if (!parkingSpace) {
    return res.status(404).json({ message: "Parking Space not found" });
  }
  res.json(parkingSpace);
});

const updateParkingSpace = asyncWrapper(async (req, res) => {
  const parkingSpaceId = req.params.id;
  const parkingSpace = await ParkingSpace.findByPk(parkingSpaceId);
  if (!parkingSpace) {
    return res.status(404).json({ message: "Parking Space not found" });
  }
  await parkingSpace.update(req.body);
  res.json(parkingSpace);
});

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
  getParkingSpaceById,
  updateParkingSpace,
  deleteParkingSpace,
};
