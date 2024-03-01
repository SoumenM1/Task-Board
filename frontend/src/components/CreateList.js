// CreateList.js
import React, { useState } from 'react';

const CreateList = ({ onCreateList }) => {
  const [listName, setListName] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleToggleInput = () => {
    setShowInput(!showInput);
    setListName(''); // Clear the input field when toggling visibility
  };

  const handleCreateList = () => {
    if (listName.trim()) {
      onCreateList(listName);
      setListName('');
      setShowInput(false); // Hide the input field after creating the list
    }
  };

  return (
    <div className="create-list" >
     <h2>Create New List</h2>   
      {!showInput ? (
        <button onClick={handleToggleInput} className='plus'>+</button>
      ) : (
        <div className="input-with-icon" >
          <input
            type="text"
            placeholder="Enter list name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <button onClick={handleCreateList}>Create</button>
        </div>
      )}
    </div>
  );
};

export default CreateList;
