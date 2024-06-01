const express = require("express");
const ticketController = require("../controllers/ticketController");

const router = express.Router();

router.get("/tickets", ticketController.getAllTickets);
router.post("/tickets", ticketController.createTicket);
router.get("/tickets/:id", ticketController.getTicketById);
router.put("/tickets/:id", ticketController.updateTicket);
router.delete("/tickets/:id", ticketController.deleteTicket);

module.exports = router;