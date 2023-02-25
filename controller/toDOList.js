/* This code exports four functions related to a To-Do List application.
The getAllToDoApp function retrieves all items from the To-Do List application by calling the ferchAll() function of the ToDoList model and sends the result as a JSON response to the client. If there is an error, it sets the error status to 500 and passes the error object to the next middleware.
The postTodoList function creates a new item in the To-Do List application by calling the post() function of the ToDoList model with the request body item as a parameter and sends the response as a JSON object with a 201 status code. If there is an error, it sets the error status to 500 and passes the error object to the next middleware.
The putTodoList function updates an existing item in the To-Do List application by calling the update() function of the ToDoList model with the request body ID and item as parameters and sends the response as a JSON object with a 201 status code. If there is an error, it sets the error status to 500 and passes the error object to the next middleware.
The deleteTodoList function deletes an existing item in the To-Do List application by calling the delete() function of the ToDoList model with the request parameters ID as a parameter and sends the response as a JSON object with a 201 status code. If there is an error, it sets the error status to 500 and passes the error object to the next middleware.
25/02/2023 Indika Sirimanna */
const ToDoList =  require('../models/toDoApp');

exports.getAllToDoApp = async (req, res, next) => {
 
  try{
    const [allTodoList] = await ToDoList.ferchAll();
    res.status(200).json(allTodoList);
  }catch(err){
    if(!err.statusCode)
    {
      err.statusCode = 500;
    }
      next(err);
  }
  
};

exports.postTodoList = async (req, res, next) => {
 
  try{
    const postResponse = await ToDoList.post(req.body.item);
    res.status(201).json(postResponse);
  }catch(err){
    if(!err.statusCode)
    {
      err.statusCode = 500;
    }
      next(err);
  }
  
};




exports.putTodoList = async (req, res, next) => {
 
  try{
    const putResponse = await ToDoList.update(req.body.id,req.body.item);
    res.status(201).json(putResponse);
  }catch(err){
    if(!err.statusCode)
    {
      err.statusCode = 500;
    }
      next(err);
  }
  
};

exports.deleteTodoList = async (req, res, next) => {
 
  try{
    const deleteResponse = await ToDoList.delete(req.params.id);
    res.status(201).json(deleteResponse);
  }catch(err){
    if(!err.statusCode)
    {
      err.statusCode = 500;
    }
      next(err);
  }
  
};