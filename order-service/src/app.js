const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");

dotenv.config();

const app = express();

// Allow requests from Vite frontend
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


// Middleware
app.use(express.json());

// Serve static files from /uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Health check route
app.get("/", (req, res) => {
  res.send("Order Service is running!");
});

// Routes
app.use("/orders", orderRoutes);

module.exports = app;
