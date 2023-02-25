/* This code sets up an Express application with middleware to handle requests and responses. Here's a breakdown of what's happening:
    The express module is required and initialized with const app = express();.
    The body-parser middleware is used to parse incoming request bodies in JSON format using app.use(bodyParser.json());.
    CORS (Cross-Origin Resource Sharing) headers are set with app.use((req,res,next)=>{...}) middleware to allow cross-origin requests to the server.
    Two routers are added with app.use('/toDoList', toDOListRoutes); and app.use('/auth', authRoutes);. These will handle requests to specific routes defined in their respective modules.
    Two error-handling middlewares are added with app.use(errorController.get404); and app.use(errorController.get500);. These will handle requests that result in 404 or 500 errors.
    The application listens on a specified port with app.listen(ports,()=> console.log('Listening on port 3306'));. The port number is either specified by the environment variable PORT, or defaults to 3306.
Overall, this code sets up an Express application with middleware to handle incoming requests, set appropriate headers, and respond with appropriate data or error messages.
25/02/2023 Indika Sirimanna */
const express = require('express');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const toDOListRoutes = require('./routes/toDoApp');

const errorController = require('./controller/error');

const authController = require('./controller/auth');

const app = express();

const ports = process.env.PORT || 3306;

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Accept, X-Custom-Header, Authorization'
      );
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
      next();
})



app.use('/toDoList', toDOListRoutes);

app.use('/auth', authRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports,()=> console.log('Listening on port 3306'));
