// contact.js
const { DataTypes } = require("sequelize");
const sequelize = require("./../db");
const User = require("./user");

const Contact = sequelize.define("Contacts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  
});

// Define associations
Contact.belongsTo(User, { foreignKey: "userid" });

module.exports = Contact;
