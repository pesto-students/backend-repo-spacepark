// payment.js
const { DataTypes } = require("sequelize");
const sequelize = require("./../db");
const User = require("./user"); // Import the User model

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderID: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  response: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  request: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

// Define association with the User model
Payment.belongsTo(User, { foreignKey: 'userId' });

module.exports = Payment;
