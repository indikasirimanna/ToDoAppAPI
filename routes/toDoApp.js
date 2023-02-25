/* This code defines an Express router that handles HTTP requests related to a to-do list app. It imports a controller module (toDOList) that defines callback functions for each route, and then sets up the routes using the router object.
    router.get('/', toDoAppController.getAllToDoApp); sets up a GET route to retrieve all to-do list items.
    router.post('/', toDoAppController.postTodoList); sets up a POST route to add a new to-do list item.
    router.put('/', toDoAppController.putTodoList); sets up a PUT route to update an existing to-do list item.
    router.delete('/:id', toDoAppController.deleteTodoList); sets up a DELETE route to delete an existing to-do list item.
Each route is associated with a corresponding controller function that handles the request and sends the appropriate response.
 25/02/2023 Indika Sirimanna*/
const express = require('express');

const toDoAppController = require('../controller/toDOList');

const router = express.Router();

router.get('/', toDoAppController.getAllToDoApp);

router.post('/', toDoAppController.postTodoList);

router.put('/', toDoAppController.putTodoList);

router.delete('/:id', toDoAppController.deleteTodoList);

module.exports = router;