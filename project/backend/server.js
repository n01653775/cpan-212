// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');  // Import the CORS middleware
const taskRoutes = require('./routes/taskRoutes');  // Import task routes

const app = express();
const port = process.env.PORT || 5000;  // Use a port from the environment variable

const apiUrl = process.env.API_URL;  // Access API_URL from environment variables

console.log("API URL:", apiUrl); // Print to verify if the value is correctly loaded

app.use(cors());  // This will allow all incoming requests from different origins

app.use(express.json());  // Middleware to parse JSON requests

// Add Cache-Control headers to prevent caching for API routes
app.use('/tasks', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Use the task routes
app.use('/tasks', taskRoutes);  // Routes for tasks

app.get('/', (req, res) => {
  res.send('Welcome to your To-Do List App!');
});

// server.js

// PUT route for marking a task as completed
app.put('/tasks/:id/completed', (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find(t => t.id === taskId);

  if (task) {
    task.completed = true; // Set task as completed
    res.json({ task });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
