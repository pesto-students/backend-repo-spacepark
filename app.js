// Import necessary modules
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
// Initialize the Express app
const app = express();

// Set the port number
const port = process.env.PORT || 3000;

// Use morgan to log requests to the console
app.use(morgan("dev"));

// Use body-parser to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", userRoutes);
app.use("/api", contactRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Example POST route
app.post("/data", (req, res) => {
  const receivedData = req.body;
  res.json({
    message: "Data received successfully",
    data: receivedData,
  });
});

// 404 error handler
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Export the app
module.exports = app;
