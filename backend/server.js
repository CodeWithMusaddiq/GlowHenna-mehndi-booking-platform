const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || true,
}));
app.use(express.json());

// Import route files
const authRoutes = require("./routes/authRoutes");
const artistRoutes = require("./routes/artistRoutes");
const designRoutes = require("./routes/designRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/designs", designRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payment", paymentRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Fouz Ki Mehndi Backend is Running...");
});

app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON request body" });
  }

  next(error);
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Database connection failed");
      console.error(error.message);
      process.exit(1);
    });
}

module.exports = app;