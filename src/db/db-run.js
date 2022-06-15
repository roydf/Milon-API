//Initialize the mongodb database
const mongoose = require("mongoose");

const dbStart = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/milon-api", {});
  console.log("connected to the database");
};

exports.dbStart = dbStart;
