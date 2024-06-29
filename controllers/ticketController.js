const asyncWrapper = require("../utils/catchAsync");
const Ticket = require("../models/ticket");
const { Op } = require("sequelize");
const moment = require("moment");

const FetchAllTickets = asyncWrapper(async (req, res) => {
  console.log("########################");
  const tickets = await Ticket.findAll().catch((err) => {
    console.log(err, "EEEEEEEEEEEEEEEEEEEEEEEE");
  });
  res.json(tickets);
});

const getAllTickets = asyncWrapper(async (req, res) => {
  const { type, userId } = req.query; // 'type' can be 'past', 'present', or 'future'
  console.log(type, "Type -------------------");
  let dateCondition;
  const currentDate = new Date();
  console.log(currentDate, "Current Date -------------------------");
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
    where: {
      [Op.and]: [
        dateCondition,
        { userId: userId }, // Replace 'yourUserId' with the actual userId value
      ],
    },
  });

  res.json(tickets);
});

async function createTicket(req, res) {
  try {
    const {
      carNumber,
      checkInTime,
      checkOutTime,
      endDate,
      mobile,
      parkingSpaceId,
      paymentId,
      price,
      serviceId,
      services,
      startDate,
      status,
      userId,
    } = req.body;

    // Parse and format dates correctly
    const formattedStartDate = moment(startDate, "DD/MM/YYYY").isValid()
      ? moment(startDate, "DD/MM/YYYY").format("YYYY-MM-DD")
      : null;
    const formattedEndDate = moment(endDate, "DD/MM/YYYY").isValid()
      ? moment(endDate, "DD/MM/YYYY").format("YYYY-MM-DD")
      : null;

    if (!formattedStartDate || !formattedEndDate) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Please use DD/MM/YYYY." });
    }

    const ticket = await Ticket.create({
      carNumber,
      checkInTime, // Expecting 'HH:mm' format
      checkOutTime, // Expecting 'HH:mm' format
      endDate: formattedEndDate,
      mobile,
      parkingSpaceId,
      paymentId,
      price,
      serviceId,
      services,
      startDate: formattedStartDate,
      status,
      userId,
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the ticket." });
  }
}

const getTicketById = asyncWrapper(async (req, res) => {
  const ticketId = req.params.id;
  const ticket = await Ticket.findByPk(ticketId);
  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }
  res.json(ticket);
});

const getActiveTicketsByUserId = asyncWrapper(async (req, res, next) => {
  const { userId } = req.params;
  const currentTime = new Date();
  console.log(currentTime);

  const tickets = await Ticket.findAll({
    where: {
      userId,
      status: {
        [Op.in]: ["Booked", "Checked-In"],
      },
      startTime: {
        [Op.lte]: currentTime,
      },
      endTime: {
        [Op.gte]: currentTime,
      },
    },
  });
  res.json(tickets);
});

const updateTicketStatus = asyncWrapper(async (req, res, next) => {
  const { ticketId, status, timeType } = req.body;

  const ticket = await Ticket.findByPk(ticketId);
  if (!ticket) {
    return res.status(404).json({ error: "Ticket not found" });
  }

  if (status === "Booked") {
    ticket.status = "Checked-In";
    ticket.startDate = new Date(); // Set start time
  } else if (status === "Checked-In") {
    ticket.status = "Completed";
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
  FetchAllTickets,
  //  updateTicket,
  //  deleteTicket,
};
