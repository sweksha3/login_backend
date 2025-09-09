const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Load offline dataset
const indiaDataPath = path.join(__dirname, "../data/india_locations.json");
const indiaData = JSON.parse(fs.readFileSync(indiaDataPath, "utf-8"));

// Get all states
router.get("/states", (req, res) => {
  res.json(Object.keys(indiaData));
});

// Get districts for a state
router.get("/districts/:state", (req, res) => {
  const { state } = req.params;
  if (indiaData[state]) {
    res.json(Object.keys(indiaData[state].districts));
  } else {
    res.status(404).json({ error: "State not found" });
  }
});

// Get cities for a district
router.get("/cities/:state/:district", (req, res) => {
  const { state, district } = req.params;
  if (indiaData[state] && indiaData[state].districts[district]) {
    res.json(indiaData[state].districts[district]);
  } else {
    res.status(404).json({ error: "District not found" });
  }
});

// Save multiple user-selected locations (example with POST)
router.post("/user/locations", (req, res) => {
  const { userId, locations } = req.body;
  // Example request body:
  // { "userId": "123", "locations": [{ "state": "Maharashtra", "district": "Pune", "city": "Hadapsar" }] }

  if (!locations || !Array.isArray(locations)) {
    return res.status(400).json({ error: "Locations must be an array" });
  }

  // Here you would normally save it to MongoDB
  // For now, just return back what was sent
  res.json({
    message: "Locations saved successfully",
    userId,
    locations
  });
});

module.exports = router;
