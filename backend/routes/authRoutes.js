const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
} = require("../controllers/authController");
const validateRequest = require("../middleware/validateRequest");
const { authLimiter } = require("../middleware/rateLimiters");
const { registerBody, loginBody } = require("../validators/requestSchemas");

router.post("/register", authLimiter, validateRequest(registerBody, "body"), registerUser);
router.post("/login", authLimiter, validateRequest(loginBody, "body"), loginUser);

module.exports = router;
