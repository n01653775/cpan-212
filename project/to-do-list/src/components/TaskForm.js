// TaskForm.js
import React, { useState, useEffect } from 'react';

function TaskForm({ onTaskCreated, taskToEdit, onSaveEdit }) {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');

  // If editing a task, pre-fill the form with its data
  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setDueDate(taskToEdit.dueDate);
    }
  }, [taskToEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!taskName || !dueDate) {
      alert('Please fill up fields');
      return;
    }

    if (taskToEdit) {
      // If editing, save the changes
      onSaveEdit(taskName, dueDate);
    } else {
      // Otherwise, create a new task
      onTaskCreated(taskName, dueDate);
    }

    // Reset form after submission
    setTaskName('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="taskName" style={{ display: 'block', marginBottom: '5px' }}>type in your task</label>
        <input
          type="text"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task description"
        />
      </div>

      <div>
        <label htmlFor="dueDate">due date </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button type="submit">
        {taskToEdit ? 'save changes' : 'add task to list'}
      </button>
    </form>
  );
}

export default TaskForm;
