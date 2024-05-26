// db.js
const { Sequelize } = require("sequelize");
const pg = require("pg"); // Import the pg package

// Connection string
const connectionString =
  "postgres://spaceparkdb_user:wRXBd1iGpiSQfRQpi8nnSg0Qg6Ajgd0Q@dpg-coohagmv3ddc738og7d0-a.singapore-postgres.render.com/spaceparkdb";

// Set up the pg package to handle BigInt type correctly
pg.defaults.parseInt8 = true;

// Create Sequelize instance
const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  dialectModule: pg, // Use the pg package for PostgreSQL
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
