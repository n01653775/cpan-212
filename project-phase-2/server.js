const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON requests

// In-memory task store
let tasks = [];

// Route for the root URL (optional)
app.get('/', (req, res) => {
  res.send('my project homepage');
});

// Route to add a task
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ message: 'put task' });
  }
  const newTask = { id: tasks.length + 1, task, completed: false };
  tasks.push(newTask);
  res.status(201).json({ message: 'task added to the list', task: newTask });
});

// Route to get all tasks
app.get('/tasks', (req, res) => {
  res.json({ tasks });
});

// Route to edit a task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ message: 'type the updated task' });
  }

  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'task not found' });
  }

  tasks[taskIndex].task = task;
  res.json({ message: 'task updated', task: tasks[taskIndex] });
});

// Route to mark a task as completed
app.put('/tasks/:id/completed', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'task not found' });
  }

  tasks[taskIndex].completed = true;
  res.json({ message: 'task completed', task: tasks[taskIndex] });
});

// Route to delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'the task id is wrong' });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.json({ message: 'task deleted', task: deletedTask[0] });
});

// Start the server
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
