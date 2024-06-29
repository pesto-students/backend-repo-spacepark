const app = require("./app");
const dotenv = require("dotenv");
const sequelize = require("./db");

dotenv.config();
const PORT = process.env.PORT || 3000;

// Check database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
