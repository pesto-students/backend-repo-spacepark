// payment.js
const { DataTypes } = require("sequelize");
const sequelize = require("./../db");
const User = require("./user"); // Import the User model

const Services = sequelize.define("Services", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  services: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

// Define association with the User model
Services.belongsTo(User, { foreignKey: 'userId' });

module.exports = Services;
