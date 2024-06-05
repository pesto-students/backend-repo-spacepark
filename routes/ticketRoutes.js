const express = require("express");
const ticketController = require("../controllers/ticketController");

const router = express.Router();

router.get("/tickets/:type", ticketController.getAllTickets);
router.post("/tickets", ticketController.createTicket); // after payment
router.get("/tickets/:id", ticketController.getTicketById); // my bookings, past, active, future, search ticket id
// router.put("/tickets/:id", ticketController.updateTicket); // future - change of time, admin,
// router.delete("/tickets/:id", ticketController.deleteTicket);

module.exports = router;
