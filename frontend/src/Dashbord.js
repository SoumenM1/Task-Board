import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import CreateList from './components/CreateList';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
const Dashboard = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // Fetch task lists from the API
    const fetchLists = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4000/api/lists');
        setLists(response.data);
      } catch (error) {
        console.error('Error fetching task lists:', error);
      }
    };

    fetchLists();
  }, []);

  const handleCreateList = async (listName) => {
    try {
      const response = await axios.post('http://127.0.0.1:4000/api/lists', { name: listName});
      const newList = response.data;
      setLists([...lists, newList]);
    } catch (error) {
      console.error('Error creating task list:', error);
    }
  };
  //updaet task
  const lasthandleUpdate = async (id, tasks) => {
    try {
      await axios.patch('http://127.0.0.1:4000/api/updatelist', { id: id, tasks: tasks });
    } catch (error) {
      console.error('Error updating task list:', error);
    }
  };
  const handleUpdate = async (id, updatedTasks) => {
    try {
      setLists(lists.map(list => list.id === id ? { ...list, tasks: updatedTasks } : list));
     await lasthandleUpdate(id,updatedTasks)
    } catch (error) {
      console.error('Error updating task list:', error);
    }
  };
  //delete task
  const deleteApi  = async (id,indexid)=>{
    try {
      await axios.delete(`http://127.0.0.1:4000/api/delete?listId=${id}&taskIndex=${indexid}`);
    } catch (error) {
      console.error('Error updating task list:', error);
    }
  }
  const handleTaskDelete = async (listId, taskIndex) => {
    try {
      const updatedLists = lists.map(list => {
        if (list.id === listId) {
          const updatedTasks = [...list.tasks];
          updatedTasks.splice(taskIndex, 1);
          return { ...list, tasks: updatedTasks };
        }
        return list;
      });
   
      setLists(updatedLists);
      await deleteApi(listId,taskIndex)
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

//dragable
  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    // If there is no destination, or the destination is the same as the source, do nothing
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    // Find the source and destination lists
    const sourceList = lists.find(list => list.id.toString() === source.droppableId);
    const destinationList = lists.find(list => list.id.toString() === destination.droppableId);

    // Copy the task from the source list to the destination list
    const updatedSourceTasks = [...sourceList.tasks];
    const updatedDestinationTasks = [...destinationList.tasks];
    const [movedTask] = updatedSourceTasks.splice(source.index, 1);
    updatedDestinationTasks.splice(destination.index, 0, movedTask);

    // Update the lists with the new task order
    const updatedLists = lists.map(list => {
      if (list.id === sourceList.id) {
        return { ...list, tasks: updatedSourceTasks };
      }
      if (list.id === destinationList.id) {
        return { ...list, tasks: updatedDestinationTasks };
      }
      return list;
    });

   // Set the updated lists
    setLists(updatedLists);
  
  };


  return (
    <DragDropContext onDragEnd={handleDragEnd}>
        <div className="lists-container" style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
          {lists.map((list, index) => (
            <TaskList
              key={index}
              listId={list.id}
              title={list.name}
              tasks={list.tasks}
              onUpdate={handleUpdate}
              onDelete={handleTaskDelete}
            />
          ))}
           <CreateList onCreateList={handleCreateList} />
        </div>
        </div>
    </DragDropContext>
  );
};

export default Dashboard;
