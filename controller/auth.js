/* This is a Node.js module exporting two functions for user authentication: signup and login.
signup function uses the bcrypt package to hash the user password and then saves the user details in the database using the User.save method. It returns a success message and HTTP status code 201 if the user is successfully registered, otherwise, it catches any errors and forwards them to the error handler middleware using next.
login function receives the user email and password from the client, retrieves the corresponding user from the database using the User.find method, and then uses bcrypt to compare the input password with the hashed password of the retrieved user. If the comparison succeeds, a JSON web token is generated using the jwt package and returned to the client along with the user ID in the response body.
If any errors occur during the authentication process, they are caught and forwarded to the error handler middleware.
Both functions follow the Node.js asynchronous programming model and use try-catch blocks to handle errors. The code appears to be written in a clean and readable manner with clear and concise variable names. However, the code could be improved by using environment variables for sensitive information such as database connection strings and secret keys for token signing.
 25/02/2023 Indika Sirimanna*/
const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const userDetails = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    const result = await User.save(userDetails);

    res.status(201).json({ message: 'User registered!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.find(email);

    if (user[0].length !== 1) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }

    const storedUser = user[0][0];

    const isEqual = await bcrypt.compare(password, storedUser.password);

    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.id,
      },
      'secretfortoken',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, userId: storedUser.id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
