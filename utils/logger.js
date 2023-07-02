const colors = require('colors/safe');

function logTodos(todos = []) {
   for (const todo of todos) {
      console.log(
         `${colors.bold('id:')}${colors.brightBlue(todo?.id)} - ${colors.bold('title:')} ${colors.brightBlue(
            todo?.title
         )} - ${colors.bold('description:')} ${colors.brightBlue(todo.description)} - ${colors.bold(
            'status:'
         )} ${todo.done ? colors.green('done') : colors.red('undone')}`
      );
   }
}

function logError(message) {
   console.log(colors.red(colors.bold(message)));
}
function logSuccess(message) {
   console.log(colors.brightBlue(colors.bold(message)));
}

module.exports = { logTodos, logError, logSuccess };
