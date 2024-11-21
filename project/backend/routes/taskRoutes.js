const express = require('express');
const router = express.Router();

// Simulating an in-memory task store
let tasks = [];

const apiUrl = process.env.API_URL;

// Example API request to another service
router.get('/external-data', async (req, res) => {
  try {
    const response = await fetch(`${apiUrl}/data-endpoint`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

module.exports = router;

router.post('/', (req, res) => {
  const { name, dueDate } = req.body;
  const createdAt = new Date().toLocaleString();
  const newTask = {
    id: Date.now(), // Using timestamp as a unique task ID
    name,
    dueDate,
    createdAt,
    completed: false, // Default task state
  };

  // Save the new task to the in-memory store (you would typically save it to a database)
  tasks.push(newTask);

  // Return the created task as a response
  res.status(201).json(newTask);
});

// Other task routes (get, update, delete, etc.)
router.get('/', (req, res) => {
  res.json(tasks); // Return all tasks
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, dueDate } = req.body;
  let taskToUpdate = tasks.find((task) => task.id === parseInt(id));

  if (taskToUpdate) {
    taskToUpdate.name = name || taskToUpdate.name;
    taskToUpdate.dueDate = dueDate || taskToUpdate.dueDate;
    res.status(200).json(taskToUpdate);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// routes/taskRoutes.js

router.put('/:id/completed', (req, res) => {
  const { id } = req.params;
  let taskToUpdate = tasks.find((task) => task.id === parseInt(id));

  if (taskToUpdate) {
    taskToUpdate.completed = true;
    res.status(200).json(taskToUpdate);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  res.status(200).json({ message: 'Task deleted successfully' });
});

module.exports = router;
