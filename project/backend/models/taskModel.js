const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date, default: null }
});

// Create and export the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
