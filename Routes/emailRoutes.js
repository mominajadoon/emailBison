const express = require("express");
const { sendEmail } = require("../Controllers/emailController");
// const authMiddleware = require("../Middleware/middleware");

const router = express.Router();

// Send email route
router.post("/send-email", sendEmail);

module.exports = router;
