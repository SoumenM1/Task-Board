// Task.js
import React from 'react';

const Task = ({ task }) => {
  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      {task.text}
    </div>
  );
};

export default Task;
