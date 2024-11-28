// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./db/dbConnect');  // Import the dbConnect function
const taskRoutes = require('./routes/taskRoutes');  // Import task routes

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
dbConnect();  // Ensure MongoDB connection is established

app.use(cors());
app.use(express.json());

// Use task routes for '/tasks' endpoint
app.use('/tasks', taskRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('hello its my project');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
