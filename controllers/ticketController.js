const asyncWrapper = require("../utils/catchAsync");
const Ticket = require("../models/ticket");
const { Op } = require("sequelize");

/*const getAllTickets = asyncWrapper(async (req, res) => {
  const tickets = await Ticket.findAll();
  res.json(tickets);
});
*/
const getAllTickets = asyncWrapper(async (req, res) => {
  const { type } = req.query; // 'type' can be 'past', 'present', or 'future'

  let dateCondition;
  const currentDate = new Date();

  switch (type) {
    case "past":
      dateCondition = {
        endDate: {
          [Op.lt]: currentDate,
        },
      };
      break;
    case "present":
      dateCondition = {
        startDate: {
          [Op.lte]: currentDate,
        },
        endDate: {
          [Op.gte]: currentDate,
        },
      };
      break;
    case "future":
      dateCondition = {
        startDate: {
          [Op.gt]: currentDate,
        },
      };
      break;
    default:
      dateCondition = {};
  }

  const tickets = await Ticket.findAll({
    where: dateCondition,
  });

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

exports.getActiveTicketsByUserId = asyncWrapper(async (req, res, next) => {
  const { userId } = req.params;

  const tickets = await Ticket.findAll({
    where: {
      userId,
      status: {
        [Op.in]: ["active", "onuse"],
      },
    },
  });
  res.json(tickets);
});

exports.updateTicketStatus = asyncWrapper(async (req, res, next) => {
  const { ticketId, status, timeType } = req.body;

  const ticket = await Ticket.findByPk(ticketId);
  if (!ticket) {
    return res.status(404).json({ error: "Ticket not found" });
  }

  if (status === "onuse") {
    ticket.status = "onuse";
    ticket.startDate = new Date(); // Set start time
  } else if (status === "used") {
    ticket.status = "used";
    ticket.endDate = new Date(); // Set end time
  }

  await ticket.save();
  res.json(ticket);
});

/*
const updateTicket = asyncWrapper(async (req, res) => {
  const ticketId = req.params.id;
  const ticket = await Ticket.findByPk(ticketId);
  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }
  await ticket.update(req.body);
  res.json(ticket);
});
*/

/*
const deleteTicket = asyncWrapper(async (req, res) => {
  const ticketId = req.params.id;
  const ticket = await Ticket.findByPk(ticketId);
  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }
  await ticket.destroy();
  res.status(204).end();
});
*/

module.exports = {
  getAllTickets,
  createTicket,
  getTicketById,
  getActiveTicketsByUserId,
  updateTicketStatus,
  //  updateTicket,
  //  deleteTicket,
};
