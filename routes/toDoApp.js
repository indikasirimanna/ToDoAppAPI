const express = require('express');

const toDoAppController = require('../controller/toDOList');

const router = express.Router();

router.get('/', toDoAppController.getAllToDoApp);

router.post('/', toDoAppController.postTodoList);

router.put('/', toDoAppController.putTodoList);

router.delete('/:id', toDoAppController.deleteTodoList);

module.exports = router;