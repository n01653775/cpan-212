// TaskItem.js

import React from 'react';

const TaskItem = ({ task, onDelete, onEdit, onMarkCompleted }) => {
  return (
    <div style={{ margin: '5px 0', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none', margin: '0' }}>
        {task.name}
      </h3>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p style={{ margin: '0', fontSize: '12px' }}>
          created {new Date(task.createdAt).toLocaleString()}
        </p>
        {task.dueDate && (
          <p style={{ margin: '0', fontSize: '12px' }}>
            due date {new Date(task.dueDate).toLocaleString()}
          </p>
        )}
        
        <div>
          <button onClick={() => onEdit(task.id)} style={{ marginRight: '10px' }}>
            edit task
          </button>
          <button onClick={() => onDelete(task.id)}>delete task</button>
          {/* Add a button to mark the task as completed */}
          <button onClick={() => onMarkCompleted(task.id)} disabled={task.completed}>
            {task.completed ? 'Completed' : 'Mark as Completed'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
