// db.js
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// Initialize Sequelize with the connection URL
const sequelize = new Sequelize(process.env.DB_CONNECTION_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // Force SSL/TLS connections
      rejectUnauthorized: false, // For development purposes only; set to true in production
    },
  },
});

module.exports = sequelize;
