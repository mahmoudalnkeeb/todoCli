const path = require('path');
const { dataFolder, defaultDB } = require('./todo.json');

module.exports = {
   dbFile: (filename = defaultDB) => path.join(__dirname, '..', dataFolder, filename),
};
