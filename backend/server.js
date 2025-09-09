const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const locationsRoutes = require("./routes/locationsRoutes");
const userLocationRoutes = require("./routes/userLocationRoutes"); // added

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/locations", locationsRoutes);
app.use("/api/user-locations", userLocationRoutes); // added

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "";

if (mongoURI) {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected successfully");
      startServer();
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err.message);
      console.warn("Starting server without DB (user-locations will not work)");
      startServer();
    });
} else {
  console.warn("No MongoDB URI provided. Starting server without DB (user-locations will not work)");
  startServer();
}

// Function to start server
function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Default route for testing
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});
