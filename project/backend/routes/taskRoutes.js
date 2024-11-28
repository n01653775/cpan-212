// routes/taskRoutes.js
const express = require('express');
const Task = require('../models/taskModel'); // Ensure correct path for the task model
const router = express.Router();

// GET all tasks
router.get('/', (req, res) => {
  Task.find()
    .then(tasks => res.json({ tasks }))
    .catch(err => res.status(500).json({ message: 'Error fetching tasks', error: err }));
});

// GET a task by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;  // Extract the task ID from the URL

  try {
    const task = await Task.findById(id);  // Query the database for the task by ID
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });  // If task not found
    }
    res.json({ task });  // Send the task data back in the response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error: error.message });  // Handle errors
  }
});


// POST new task
router.post('/', (req, res) => {
  const { task, dueDate } = req.body;
  const newTask = new Task({ task, dueDate });
  newTask.save()
    .then(task => res.status(201).json({ task }))
    .catch(err => res.status(500).json({ message: 'Error creating task', error: err }));
});

// Put route to update a task
router.put('/:id', async (req, res) => {
  const { id } = req.params; // Get the task ID from the URL
  const { task, dueDate } = req.body; // Get the updated task data from the request body

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, dueDate, updatedAt: new Date() }, // Update task and dueDate
      { new: true } // Return the updated task
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.json({ task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
});


// PUT - Mark a task as completed
router.put('/:id/completed', (req, res) => {
  const { id } = req.params;
  
  Task.findById(id)
    .then(task => {
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      task.completed = true;
      task.updatedAt = new Date(); // Optional: Update the `updatedAt` field
      return task.save();
    })
    .then(updatedTask => res.status(200).json({ task: updatedTask }))
    .catch(err => res.status(500).json({ message: 'Error updating task', error: err }));
});

// DELETE a task
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  Task.findByIdAndDelete(id)
    .then(deletedTask => {
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ task: deletedTask });
    })
    .catch(err => res.status(500).json({ message: 'Error deleting task', error: err }));
});

module.exports = router;
