/* This code exports a class named toDoApp which has four static methods to interact with a SQL database using the db object imported from another module. The constructor function initializes an object with two properties id and item.
The fetchAll method returns all rows of the toDoListTable table in the database. The post method inserts a new row with the given item value into the toDoListTable table. The update method updates a row with the given id in the toDoListTable table with the new item value. The delete method removes a row with the given id from the toDoListTable table.
The methods are defined as static because they are not tied to any specific instance of the class. They can be called directly on the class without instantiating it. Each method returns a promise which resolves to the result of executing the corresponding SQL query using the db object. If any error occurs, the promise is rejected with the error object, which is handled in the functions where these methods are called.
25/02/2023 Indika Sirimanna */
const db = require('../util/database');


module.exports = class toDOApp {
    constructor(id, item){
        this.id = id;
        this.item = item;
        
    }

    static ferchAll(){
        return db.execute('SELECT * FROM toDoListTable')
    }

    static post (item){
        return db.execute('INSERT INTO toDoListTable (item) VALUES (?)', [item]);
    }



    static update (id, item){
        return db.execute('UPDATE toDoListTable SET item = ? WHERE id = ?', [item, id]);
    }

    static delete (id){
        return db.execute('DELETE FROM toDoListTable WHERE id = ?', [id]);
    }
};