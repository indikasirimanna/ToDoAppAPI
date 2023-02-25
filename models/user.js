/* This is a Node.js module that defines a User class and exports it. The class has a constructor that takes in three arguments: name, email, and password, which are used to create a user object.
The module also defines two static methods: find and save. The find method takes an email parameter and uses it to query the users table in a MySQL database. The method returns a promise that resolves to an array containing the user(s) with the matching email.
The save method takes a user parameter, which is an object containing the user's name, email, and password. It uses these values to insert a new row into the users table in the database. The method returns a promise that resolves to an object containing information about the insert operation.
The database connection is established using the db object, which is imported from the database.js file located in the util directory. This file contains code for connecting to the MySQL database using the mysql2 library.
25/02/2023 Indika Sirimanna */
const db = require('../util/database');

module.exports = class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static find(email) {
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }

  static save(user) {
    return db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [user.name, user.email, user.password]
    );
  }
};
