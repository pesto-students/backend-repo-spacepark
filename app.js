// Import necessary modules
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const paymentRoutes = require("./routes/PaymentRoute");
const services = require("./routes/ServicesRoute");
const parkingSpaceRoutes = require("./routes/parkingSpaceRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const cors = require("cors");
const authMiddleware = require("./middlewares/authMiddleware");
// Initialize the Express app
const app = express();

// Set the port number
const port = process.env.PORT || 3000;

app.use(cors());
app.options("*", cors());
// Use morgan to log requests to the console
app.use(morgan("dev"));

// Use body-parser to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
//app.use(authMiddleware);
app.use("/api", authRoutes);
app.use("/users", userRoutes);
app.use("/api", contactRoutes);
app.use("/api", paymentRoutes);
app.use("/api", services);
app.use("/api", parkingSpaceRoutes);
app.use("/api", ticketRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 404 error handler
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  //wil write remainf code later
  res.status(500).send("Something went wrong!", err.status, err.message);
});

// Export the app
module.exports = app;
