import React, { useState, useEffect } from 'react';
import { getTasks, createTask, markTaskCompleted, deleteTask, updateTask } from './services/api'; // Import the updateTask function

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks using the imported API function
  const fetchTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  // Handle task creation using the imported API function
  const createNewTask = async () => {
    const newTask = await createTask({ task, dueDate });
    setTask('');
    setDueDate('');
    fetchTasks(); // Refresh task list
  };

  // Mark a task as completed using the imported API function
  const completeTask = async (id) => {
    await markTaskCompleted(id);
    fetchTasks(); // Refresh task list
  };

  // Handle task deletion using the imported API function
  const removeTask = async (id) => {
    await deleteTask(id);
    fetchTasks(); // Refresh task list
  };

  // Handle task update using the imported API function
  const updateExistingTask = async () => {
    const updatedTask = await updateTask(editingTaskId, { task: editingTaskText });
    setEditingTaskId(null);
    setEditingTaskText('');
    fetchTasks(); // Refresh task list after updating
  };

  // Function to format the due date (only showing the date part)
  const formatDate = (date) => {
    if (!date) return 'No due date'; // If no due date, return a default text
    const formattedDate = new Date(date).toLocaleDateString('en-US'); // Format as MM/DD/YYYY
    return formattedDate;
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      
      <div className="task-input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={createNewTask}>Add Task</button>
      </div>

      {editingTaskId && (
        <div className="edit-task">
          <input
            type="text"
            value={editingTaskText}
            onChange={(e) => setEditingTaskText(e.target.value)}
          />
          <button onClick={updateExistingTask}>Update Task</button>
        </div>
      )}

      <div className="task-list">
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-info">
                <div className="task-name">{task.task}</div>
                <div className="task-due-date">{formatDate(task.dueDate)}</div>
                <div className="task-actions">
                  {!task.completed && (
                    <button onClick={() => completeTask(task._id)}>Complete</button>
                  )}
                  <button onClick={() => removeTask(task._id)}>Delete</button>
                  <button onClick={() => {
                    setEditingTaskId(task._id);
                    setEditingTaskText(task.task);
                  }}>
                    Edit
                  </button>
                </div>
              </div>
              {task.completed && (
                <span className="completed-indicator">Completed</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
