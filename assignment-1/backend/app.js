// Load environment variables from the .env file
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Enable CORS for all routes (optional, helpful for frontend requests from different origin)

// MongoDB connection using the MONGO_URI from .env file
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error: ', err);
  });

// Routes
const courseRoutes = require('./routes/courses'); // Import the course routes
const studentRoutes = require('./routes/students'); // Import the student routes

// Use routes
app.use('/api/courses', courseRoutes); // All routes starting with /api/courses will be handled by courseRoutes
app.use('/api/students', studentRoutes); // All routes starting with /api/students will be handled by studentRoutes

// Use the port from .env, default to 5000 if not set
const port = process.env.PORT || 5000; // Port number
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
