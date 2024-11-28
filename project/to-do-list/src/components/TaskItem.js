import React from 'react';

const TaskItem = ({ task, onDelete, onEdit, onMarkCompleted }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.task}
      </h3>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <div>
        <button onClick={() => onEdit(task)}>{task.completed ? 'Completed' : 'Edit'}</button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
        <button onClick={() => onMarkCompleted(task._id)} disabled={task.completed}>
          {task.completed ? 'Completed' : 'Mark as Completed'}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
