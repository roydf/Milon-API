const dbRun = require("../db/db-run.js");
const jsonToMongo = require("./json-to-mongo.js");

//init the database and coverts all words from the json file to mongodb collection of words
dbRun.dbStart();
jsonToMongo.createDict();
