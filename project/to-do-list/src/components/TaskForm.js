import React, { useState, useEffect } from 'react';

function TaskForm({ onTaskCreated, taskToEdit, onSaveEdit }) {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');

  // If editing a task, pre-fill the form with its data
  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.task);
      setDueDate(taskToEdit.dueDate);
    }
  }, [taskToEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!taskName || !dueDate) {
      alert('Please fill out both fields.');
      return;
    }

    if (taskToEdit) {
      // Edit existing task
      onSaveEdit(taskToEdit._id, { task: taskName, dueDate });
    } else {
      // Create new task
      onTaskCreated(taskName, dueDate);
    }

    // Clear the form
    setTaskName('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Task description" 
        value={taskName} 
        onChange={(e) => setTaskName(e.target.value)} 
      />
      <input 
        type="date" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)} 
      />
      <button type="submit">{taskToEdit ? 'Save Changes' : 'Add Task'}</button>
    </form>
  );
}

export default TaskForm;
