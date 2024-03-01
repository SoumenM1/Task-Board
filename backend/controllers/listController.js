const List = require('../models/List');

exports.getAllLists = async (req, res) => {
  try {
    const lists = await List.findAll();
    res.json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createList = async (req, res) => {
    const { name, tasks } = req.body;
    try {
      const newList = await List.create({ name, tasks });
      res.json(newList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  exports.updateData = async (req, res) => {
    const { id, tasks } = req.body;
    console.log(id,tasks)
    try {
      // Assuming you have a Sequelize model called List representing your data
      const list = await List.findByPk(id); // Find the record by its primary key
  
      if (!list) {
        // Handle case where the record doesn't exist
        console.error('Record not found');
        return res.status(404).json({ error: 'Record not found' });
      }
  
      const updatedTasks = [...list.tasks, ...tasks];
      const data=await list.update({ tasks: updatedTasks });
      res.status(200).json({ data:data,message: 'Data updated successfully' });
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  exports.deleteData = async (req,res)=>{
    const { listId, taskIndex } = req.query;  // Assuming listId and taskIndex are sent in the request body

  try {
    // Find the list by its ID
    const list = await List.findByPk(listId);

    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    // Remove the task at the specified index from the tasks array
    const updatedTasks = [...list.tasks];
    updatedTasks.splice(taskIndex, 1);

    // Update the tasks array in the database
    await list.update({ tasks: updatedTasks });

    // Send a success response
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  }
  