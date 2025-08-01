const express = require('express');
const cors = require('cors');
const path = require('path');
const photoRoutes = require('./routes/photos');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the photo folder
app.use('/photos', express.static(process.env.PHOTO_FOLDER_PATH));

// Routes
app.use('/api/photos', photoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;