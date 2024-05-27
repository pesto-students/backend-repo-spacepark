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
  QueryString: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Define associations
Contact.belongsTo(User, { foreignKey: "userid" });

module.exports = Contact;
