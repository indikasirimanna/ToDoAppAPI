/* This code defines an Express router for handling HTTP requests related to user authentication, including signup and login.
The router is created using the express.Router() method and is exported for use in other parts of the application. It depends on several other modules, including the express-validator library for input validation, the User model for accessing user data in the database, and the authController for handling the actual authentication logic.
The /signup route expects a POST request with three fields in the request body: name, email, and password. The request body is validated using the express-validator middleware, which checks that the name field is not empty, the email field is a valid email address and does not already exist in the database, and the password field has a minimum length of 7 characters. If the validation passes, the authController.signup function is called to handle the actual signup logic.
The /login route expects a POST request with two fields in the request body: email and password. The authController.login function is called to handle the login logic.
Overall, this code follows good practices for handling user authentication, including input validation and separation of concerns between routing and controller logic.
 25/02/2023 Indika Sirimanna */
const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controller/auth');

router.post(
  '/signup',
  [
    body('name').trim().not().isEmpty(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (email) => {
        const user = await User.find(email);
        if (user[0].length > 0) {
          return Promise.reject('Email address already exist!');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 7 }),
  ],
  authController.signup
);

router.post('/login', authController.login);

module.exports = router;
