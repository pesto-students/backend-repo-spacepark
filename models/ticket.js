const { DataTypes } = require("sequelize");
const sequelize = require("./../db");
const User = require("./user"); // Import the User model
const ParkingSpace = require("./parkingSpace"); //Import the Parking Space model
const Service = require("./ServericesModel"); // Import the service model

const Ticket = sequelize.define("Tickets", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  parkingSpaceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  serviceId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  checkInTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  checkOutTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  services: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // active, onuse, used, expired
  //add on more filed for QRcode id
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Define association with the User, ParkingSpace and Service models
Ticket.belongsTo(User, { foreignKey: "userId" });
Ticket.belongsTo(ParkingSpace, { foreignKey: "parkingSpaceId" });
Ticket.belongsTo(Service, { foreignKey: "serviceId" });

module.exports = Ticket;
