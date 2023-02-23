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