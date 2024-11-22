// TaskList.js

import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onEdit, onMarkCompleted }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
            onMarkCompleted={onMarkCompleted}  // Pass onMarkCompleted to TaskItem
          />
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
