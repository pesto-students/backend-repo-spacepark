// contact.js
const { DataTypes } = require("sequelize");
const sequelize = require("./../db");
const User = require("./user");

const Contact = sequelize.define("Contact", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Define associations
Contact.belongsTo(User, { foreignKey: "userid" });

module.exports = Contact;
