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
