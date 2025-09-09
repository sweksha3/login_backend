const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const locationsRoutes = require('./routes/locationsRoutes');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/locations', locationsRoutes);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || '', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.warn('MongoDB connection failed or not provided. Starting server without DB for locations only.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT} (DB not connected)`));
  });
