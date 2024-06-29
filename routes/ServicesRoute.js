const express = require("express");
const ServicesController = require("../controllers/ServicesController");

const router = express.Router();

router.get("/services", ServicesController.getAllServices);
router.post("/services", ServicesController.createService);
router.get("/services/:id", ServicesController.getServiceById);
router.put("/services/:id", ServicesController.updateServiceById);
router.delete("/services/:id", ServicesController.deleteService);

module.exports = router;
