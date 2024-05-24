const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

// Create a new pool instance with the connection URL
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_URL,
  ssl: {
    rejectUnauthorized: false, // For development purposes only; set to true in production
  },
});

// Log a message when a new client connects to the pool
pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database");
});

// Log any errors that occur while handling clients in the pool
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = async function establishConnection() {
  try {
    await pool.query("SELECT NOW()");
    console.log("Connection to the database established successfully");
  } catch (err) {
    console.error("Error establishing a connection to the database", err.stack);
    process.exit(-1); // Exit the application if connection fails
  }
};
module.exports = pool;
