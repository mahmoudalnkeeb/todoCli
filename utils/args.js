const {
   createTodo,
   getTodos,
   getTodo,
   markDone,
   deleteTodo,
   markUndone,
} = require('../services/todo.service');
const { logTodos, logError, logSuccess } = require('./logger');

// function handleArgs(db, argv) {
//    if (argv?._.includes('new')) {
//       let title = argv.title;
//       let desc = argv.desc || null;
//       if (!title) return console.log('title is required');
//       createTodo(title, desc, db)
//          .then((todo) => logTodos([todo]))
//          .finally(() => db.close());
//    } else if (argv?._.includes('get')) {
//       let filter = argv.filter ? argv.filter : 'all';
//       if (!argv.id) {
//          getTodos(filter, db)
//             .then((todos) => logTodos(todos))
//             .finally(() => db.close());
//       } else {
//          getTodo(id, db).then((todo) => console.table(todo));
//       }
//    } else if (argv?._.includes('done')) {
//       let id = argv?.id;
//       if (id === true) {
//          console.log('Todo with the specified ID not found.');
//       } else
//          markDone(id, db)
//             .then((success) => {
//                if (success) {
//                   console.log(`Todo with id ${id} marked as done successfully.`);
//                } else {
//                   console.log('Todo with the specified ID not found.');
//                }
//             })
//             .catch((error) => {
//                console.error(error);
//             })
//             .finally(() => db.close());
//    } else if (argv?._.includes('done')) {
//       let id = argv?.id;
//       if (id === true) {
//          console.log('Todo with the specified ID not found.');
//       } else
//          markDone(id, db)
//             .then((success) => {
//                if (success) {
//                   console.log(`Todo with id ${id} marked as done successfully.`);
//                } else {
//                   console.log('Todo with the specified ID not found.');
//                }
//             })
//             .catch((error) => {
//                console.error(error);
//             })
//             .finally(() => db.close());
//    } else if (argv?._.includes('done')) {
//       let id = argv?.id;
//       if (id == true) {
//          console.log('Todo with the specified ID not found.');
//       } else
//          markDone(id, db)
//             .then((success) => {
//                if (success) {
//                   console.log(`Todo with id ${id} marked as done successfully.`);
//                } else {
//                   console.log('Todo with the specified ID not found.');
//                }
//             })
//             .catch((error) => {
//                console.error(error);
//             })
//             .finally(() => db.close());
//    } else if (argv?._.includes('undone')) {
//       let id = argv?.id;
//       if (id === true) {
//          console.log('Todo with the specified ID not found.');
//       } else
//          markUndone(id, db)
//             .then((success) => {
//                if (success) {
//                   console.log(`Todo with id ${id} marked as undone successfully.`);
//                } else {
//                   console.log('Todo with the specified ID not found.');
//                }
//             })
//             .catch((error) => {
//                console.error(error);
//             })
//             .finally(() => db.close());
//    } else if (argv?.delete) {
//       let id = argv?.id;
//       deleteTodo(id, db)
//          .then((success) => {
//             if (success) {
//                console.log(`Todo with id ${id} deleted successfully.`);
//             } else {
//                console.log('Todo with the specified ID not found.');
//             }
//          })
//          .catch((error) => {
//             console.error(error);
//          });
//    }
//    //    else if (argv?.update) {}
//    //    else if (argv?.db) {}
// }

function handleArgs(db, argv) {
   const command = argv?._[0];
   const id = argv?.id;

   const handleError = (error) => {
      logError(error);
   };

   const handleSuccess = (message) => {
      logSuccess(message);
   };

   const handleNotFound = () => {
      logError('Todo with the specified ID not found.')
   };

   const closeDbConnection = () => {
      db.close();
   };

   const isNumeric = (value) => {
      return /^-?\d+$/.test(value);
   };

   switch (command) {
      case 'new':
         const title = argv.title;
         const desc = argv.desc || null;
         if (!title || typeof title !== 'string') {
            console.log('Invalid title');
            return;
         }
         createTodo(title, desc, db)
            .then((todo) => logTodos([todo]))
            .finally(closeDbConnection);
         break;

      case 'get':
         const filter = argv.filter ? argv.filter : 'all';
         if (!id || !isNumeric(id)) {
            getTodos(filter, db)
               .then((todos) => logTodos(todos))
               .finally(closeDbConnection);
         } else {
            getTodo(id, db).then((todo) => console.table(todo));
         }
         break;

      case 'done':
         if (!id || !isNumeric(id)) {
            console.log('Invalid ID');
            return;
         }
         markDone(id, db)
            .then((success) => {
               if (success) {
                  handleSuccess(`Todo with id ${id} marked as done successfully.`);
               } else {
                  handleNotFound();
               }
            })
            .catch(handleError)
            .finally(closeDbConnection);
         break;

      case 'undone':
         if (!id || !isNumeric(id)) {
            console.log('Invalid ID');
            return;
         }
         markUndone(id, db)
            .then((success) => {
               if (success) {
                  handleSuccess(`Todo with id ${id} marked as undone successfully.`);
               } else {
                  handleNotFound();
               }
            })
            .catch(handleError)
            .finally(closeDbConnection);
         break;

      case 'delete':
         if (!id || !isNumeric(id)) {
            console.log('Invalid ID');
            return;
         }
         deleteTodo(id, db)
            .then((success) => {
               if (success) {
                  handleSuccess(`Todo with id ${id} deleted successfully.`);
               } else {
                  handleNotFound();
               }
            })
            .catch(handleError);
         break;

      default:
         console.log('Invalid command');
         break;
   }
}

module.exports = handleArgs;
