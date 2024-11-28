// controllers/taskController.js
const Task = require('../models/taskModel');  // Import the Task model

// Create a new task
const createTask = async (req, res) => {
  const { task, dueDate } = req.body;  // Extract 'task' and 'dueDate' from request body

  if (!task) {
    return res.status(400).json({ message: 'Task description is required.' });
  }

  const newTask = new Task({
    task,
    dueDate,
    completed: false,  // Default value
  });

  try {
    // Save the new task to MongoDB
    const savedTask = await newTask.save();
    res.status(201).json({ message: 'Task added to the list', task: savedTask });
  } catch (err) {
    console.error('Error saving task:', err);
    res.status(500).json({ error: 'Error saving task', details: err.message });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();  // Get all tasks from MongoDB
    res.json(tasks);  // Send tasks as response
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tasks', details: err.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { task, dueDate } = req.body;

  if (!task) {
    return res.status(400).json({ message: 'Please provide the updated task.' });
  }

  try {
    // Find and update the task by ID
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, dueDate, updatedAt: new Date() },  // Update fields
      { new: true }  // Return the updated task
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.json({ message: 'Task updated', task: updatedTask });
  } catch (err) {
    res.status(500).json({ error: 'Error updating task', details: err.message });
  }
};

// Mark a task as completed
const markTaskCompleted = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { completed: true, updatedAt: new Date() },  // Mark as completed
      { new: true }  // Return updated task
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.json({ message: 'Task completed', task });
  } catch (err) {
    res.status(500).json({ error: 'Error marking task completed', details: err.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);  // Delete task by ID

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.json({ message: 'Task deleted', task: deletedTask });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting task', details: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  markTaskCompleted,
  deleteTask,
};
