import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onEdit, onMarkCompleted }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <TaskItem
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
            onMarkCompleted={onMarkCompleted}
          />
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
