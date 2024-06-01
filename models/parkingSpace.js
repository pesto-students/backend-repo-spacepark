const { DataTypes } = require("sequelize");
const sequelize = require("./../db");
const User = require("./user"); // Import the User model
const Service = require("./ServericesModel"); // Import the service model

const ParkingSpace = sequelize.define("ParkingSpace", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  noOfSpaces: {
    type: DataTypes.INTEGER,
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

// Define association with the User and Service models
ParkingSpace.belongsTo(User, { foreignKey: 'userId' });
ParkingSpace.hasOne(Service, { foreignKey: 'serviceId'});

module.exports = ParkingSpace;