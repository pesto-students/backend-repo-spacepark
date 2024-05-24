import { app } from ".app.js";
const pool = require("./db");

app.listen(process.env.PORT, () => {
  console.log("Server connected");
});
