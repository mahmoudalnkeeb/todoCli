const sqlite3 = require('sqlite3').verbose();
const { dbFile } = require('./configs/env');
let db = new sqlite3.Database(dbFile());

db.run(
   'CREATE TABLE IF NOT EXISTS todos(id INTEGER PRIMARY KEY AUTOINCREMENT , title TEXT NOT NULL , description TEXT , done BOOLEAN NOT NULL DEFAULT 0)'
);

db.close();
