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