const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/createTask', taskController.createTask);
router.put('/updateTask/:id', taskController.updateTask);
router.get('/listTasks', taskController.listTasks);
router.delete('/deleteTask/:id', taskController.deleteTask);

module.exports = router;