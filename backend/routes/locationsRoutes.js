const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  try {
    const p = path.join(__dirname, '..', 'data', 'india_locations.json');
    res.sendFile(p);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load locations' });
  }
});
module.exports = router;
