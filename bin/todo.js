#!/usr/bin/env node\
const argv = require('minimist')(process.argv.slice(2));
const sqlite3 = require('sqlite3').verbose();
const { dbFile } = require('../configs/env');
const handleArgs = require('../utils/args');

let file = argv?.f ? argv?.file : false;
let db = file ? new sqlite3.Database(dbFile(file)) : new sqlite3.Database(dbFile());

handleArgs(db, argv);
