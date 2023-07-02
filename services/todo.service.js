// get todo by id
function getTodo(id, db) {
   return new Promise((res, rej) => {
      db.get('SELECT id, title, description, done FROM todos WHERE id=?', [id], (err, row) => {
         if (err) {
            rej(err);
         } else {
            res(row);
         }
      });
   });
}

// get all todos all filter them based on done status
function getTodos(filter = 'all', db) {
   return new Promise((res, rej) => {
      let query = '';

      switch (filter) {
         case 'done':
            query = 'SELECT id, title, description, done FROM todos WHERE done=1';
            break;
         case 'undone':
            query = 'SELECT id, title, description, done FROM todos WHERE done=0';
            break;
         case 'all':
         default:
            query = 'SELECT id, title, description, done FROM todos';
            break;
      }

      db.all(query, (err, rows) => {
         if (err) {
            rej(err);
         } else {
            res(rows);
         }
      });
   });
}

// create new todo
function createTodo(title, description, db) {
   return new Promise((res, rej) => {
      db.run('INSERT INTO todos(title, description) VALUES(?, ?)', [title, description], function (err) {
         if (err) {
            rej(err);
         } else {
            res({ id: this.lastID, title, description, done: 0 });
         }
      });
   });
}

// Update todo by id to done = true
function markDone(id, db) {
   return new Promise((resolve, reject) => {
      db.run('UPDATE todos SET done = 1 WHERE id = ?', [id], function (err) {
         if (err) {
            reject(err);
         } else {
            resolve(this.changes > 0); // Resolve with a boolean indicating if the update was successful
         }
      });
   });
}
// Update todo by id to done = false
function markUndone(id, db) {
   return new Promise((resolve, reject) => {
      db.run('UPDATE todos SET done = 0 WHERE id = ?', [id], function (err) {
         if (err) {
            reject(err);
         } else {
            resolve(this.changes > 0); // Resolve with a boolean indicating if the update was successful
         }
      });
   });
}

// Delete todo by id
function deleteTodo(id, db) {
   return new Promise((resolve, reject) => {
      db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
         if (err) {
            reject(err);
         } else {
            resolve(this.changes > 0); // Resolve with a boolean indicating if the deletion was successful
         }
      });
   });
}

module.exports = { getTodo, getTodos, createTodo, markDone, markUndone, deleteTodo };
