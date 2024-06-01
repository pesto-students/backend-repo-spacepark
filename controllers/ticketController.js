const asyncWrapper = require("../utils/catchAsync");
const Ticket = require("../models/ticket");

const getAllTickets = asyncWrapper(async (req, res) => {
  const tickets = await Ticket.findAll();
  res.json(tickets);
});

const createTicket = asyncWrapper(async (req, res) => {
  const newTicket = await Ticket.create(req.body);
  res.status(201).json(newTicket);
});

const getTicketById = asyncWrapper(async (req, res) => {
  const ticketId = req.params.id;
  const ticket = await Ticket.findByPk(ticketId);
  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }
  res.json(ticket);
});

const updateTicket = asyncWrapper(async (req, res) => {
  const ticketId = req.params.id;
  const ticket = await Ticket.findByPk(ticketId);
  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }
  await ticket.update(req.body);
  res.json(ticket);
});

const deleteTicket = asyncWrapper(async (req, res) => {
  const ticketId = req.params.id;
  const ticket = await Ticket.findByPk(ticketId);
  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }
  await ticket.destroy();
  res.status(204).end();
});

module.exports = {
  getAllTickets,
  createTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
};