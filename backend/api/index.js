const app = require("../server");
const connectDB = require("../config/db");

module.exports = async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Database connection failed");
    return res.status(500).json({ message: "Database connection failed" });
  }
};