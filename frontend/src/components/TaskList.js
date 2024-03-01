import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList = ({ listId, title, tasks, onDelete, onUpdate }) => {
  const [newTask, setNewTask] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleTaskDelete = (index) => {
    onDelete(listId, index);
  };

  const handleTaskAdd = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, newTask];
      onUpdate(listId, updatedTasks);
      setNewTask('');
      setShowInput(false);
    }
  };

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  return (
    <Droppable droppableId={String(listId)}>
      {(provided) => (
        <div className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
          <h2>{title}</h2>
          <div>
            {tasks.map((task, index) => (
              <Draggable key={`${title}-${index}`} draggableId={`${title}-${index}`} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="task"
                  >
                    <input
                      type="checkbox"
                      checked={false} // Initially set to false, adjust as needed
                      value={newTask}
                      onChange={() => handleTaskDelete(index)}
                    />
                    <span className="task-text">{task}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {!showInput ? (
              <button onClick={toggleInput} className='plus'>+</button>
            ) : (
              <div className="input-with-icon">
                <input
                  type="text"
                  placeholder="Enter list name"
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={handleTaskAdd}>Create</button>
              </div>
            )}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
