const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

//
// Middleware
const allowedOrigins = [
  "http://localhost:8080",  // Your local frontend
  "https://yourfrontend.com" // Your deployed frontend
];

app.use(cors({
  origin: allowedOrigins, // Only allow specific origins
  credentials: true, // Allow cookies, authorization headers
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
}));

app.use(express.json());

//
// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

//
// Routes
app.use("/api/auth", require("./Routes/authRoutes"));
// app.use("/api/email", require("./Routes/emailRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export App
module.exports = app;
