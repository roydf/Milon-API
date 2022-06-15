//This code runs to create the database only once.
const fs = require("fs");
const Word = require("../models/words");


//takes the json file and upload all the words to mongodb database
const createDict = async function () {
  const milonFile = JSON.parse(fs.readFileSync("./src/words-list/words.json"));
  await milonFile.forEach((word) => {
    new Word(word).save();
  });

  console.log("Finished creating the DB ");
  console.log('You may now close this script')
};

exports.createDict = createDict;
