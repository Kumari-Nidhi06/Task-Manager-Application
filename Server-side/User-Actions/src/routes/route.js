const router = require('express').Router();
const taskController = require('../controllers/task.controller');

router.get('/temp', async (req, res) => {
    res.send(await Todo.find());
});

router.post('/createTask', taskController.createTask);

router.get('/getAllTaskByUserId', taskController.getAllTaskByUserId);

router.put('/updateTask/:id', taskController.updateTask);

router.delete('/deleteTask/:id', taskController.deleteTask);

router.put('/updateStatus/:id', taskController.updateStatus);


module.exports = router;