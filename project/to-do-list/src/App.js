import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // Handle new task creation
  const handleTaskCreated = (newTaskText, newDueDate) => {
    const newTask = {
      name: newTaskText,
      dueDate: newDueDate,
    };

    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks((prevTasks) => [...prevTasks, data]);
      })
      .catch((error) => {
        console.error('Error creating task:', error);
      });
  };

  // Handle task deletion
  const handleDelete = (taskId) => {
    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  // Handle editing task
  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTask(taskToEdit);
  };

  // Save the edited task
  const handleSaveEdit = (editedTaskText, editedDueDate) => {
    fetch(`http://localhost:5000/tasks/${editingTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: editedTaskText,
        dueDate: editedDueDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editingTask.id
              ? { ...task, name: editedTaskText, dueDate: editedDueDate }
              : task
          )
        );
        setEditingTask(null); // Clear editing state
      })
      .catch((error) => {
        console.error('Error editing task:', error);
      });
  };

  // Mark task as completed
  const handleMarkCompleted = (taskId) => {
    fetch(`http://localhost:5000/tasks/${taskId}/completed`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, completed: true } : task
          )
        );
      })
      .catch((error) => {
        console.error('Error marking task as completed:', error);
      });
  };

  return (
    <div>
      <h2>my to-do list</h2>
      <TaskForm
        onTaskCreated={handleTaskCreated}
        taskToEdit={editingTask}
        onSaveEdit={handleSaveEdit}
      />
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onMarkCompleted={handleMarkCompleted}
        />
      )}
    </div>
  );
}

export default App;
