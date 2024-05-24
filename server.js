const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

const { pool, establishConnection } = require("./db");

pool.on("connect", () => {
  console.log("Connected to the database");
});

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);

  await establishConnection();
});
