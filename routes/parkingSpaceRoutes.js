const express = require("express");
const parkingSpaceController = require("../controllers/parkingSpaceController");

const router = express.Router();

router.get("/parkingSpaces", parkingSpaceController.getAllParkingSpaces);
router.post("/parkingSpaces", parkingSpaceController.createParkingSpace);
router.get("/parkingSpaces/:id", parkingSpaceController.getParkingSpaceById);
router.put("/parkingSpaces/:id", parkingSpaceController.updateParkingSpace);
router.delete("/parkingSpaces/:id", parkingSpaceController.deleteParkingSpace);

module.exports = router;