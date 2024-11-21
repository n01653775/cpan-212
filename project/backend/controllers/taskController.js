// controllers/taskController.js

// In-memory tasks array (just for learning)
let tasks = [];

// Create a new task
const createTask = (req, res) => {
  const { task, createdAt, dueDate } = req.body;

  if (!task) {
    return res.status(400).json({ message: 'Task description is required.' });
  }

  const newTask = {
    id: tasks.length + 1,
    task,
    completed: false, // Default value
    createdAt: createdAt || new Date().toISOString(),
    dueDate: dueDate || null,
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newTask);  // Add to the in-memory list
  res.status(201).json({ message: 'Task added to the list', task: newTask });
};

// Get all tasks
const getTasks = (req, res) => {
  res.json({ tasks });
};

// Update a task
const updateTask = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ message: 'Please provide the updated task.' });
  }

  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found.' });
  }

  tasks[taskIndex].task = task;  // Update task
  tasks[taskIndex].updatedAt = new Date().toISOString();  // Update timestamp
  res.json({ message: 'task updated', task: tasks[taskIndex] });
};

// Mark a task as completed
const markTaskCompleted = (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found.' });
  }

  tasks[taskIndex].completed =true;  // Mark as completed
  res.json({ message: 'Task completed', task: tasks[taskIndex] });
};

// Delete a task
const deleteTask = (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found.' });
  }

  const deletedTask = tasks.splice(taskIndex, 1);  // Remove from list
  res.json({ message: 'Task deleted', task: deletedTask[0] });
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  markTaskCompleted,
  deleteTask,
};
