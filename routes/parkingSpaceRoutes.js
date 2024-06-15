const express = require("express");
const parkingSpaceController = require("../controllers/parkingSpaceController");
const authmiddleware = require('./../middlewares/authMiddleware');


const router = express.Router();

router.get(
  "/parkingSpaces",
  parkingSpaceController.getAllParkingSpaces
);
router.post(
  "/parkingSpaces",
  // authmiddleware,
  parkingSpaceController.createParkingSpace
);
router.get("/parkingSpaces/:id", parkingSpaceController.getParkingSpaceById);
router.put("/parkingSpaces/:id", parkingSpaceController.updateParkingSpace);
router.delete("/parkingSpaces/:id", parkingSpaceController.deleteParkingSpace);

module.exports = router;
