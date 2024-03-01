const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

router.get('/lists', listController.getAllLists);
router.post('/lists', listController.createList);
router.patch('/updatelist',listController.updateData)
router.delete('/delete',listController.deleteData)
// Other list routes (update, delete) can be added here

module.exports = router;
