// db.js
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const config = require('./config/config');

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

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Log information about database schema
async function logSchema() {
  try {
    const schema = {};
    const tables = await sequelize.showAllSchemas();
    for (const table of tables) {
      const tableName = table.name;
      const columns = await sequelize.queryInterface.describeTable(tableName);
      schema[tableName] = columns;
    }
    console.log('Database Schema:');
    console.log(schema);
  } catch (error) {
    console.error('Error retrieving database schema:', error);
  }
}

// Call functions to test connection and log schema
testConnection();
logSchema();

module.exports = sequelize;
