const mongoose = require("mongoose");

//Init the words database model.
const wordSchema = mongoose.Schema(
  {
    hebTranslation: {
      type: String,
    },
    enTranslation: {
      type: Array,
    },
  },
  {
    versionKey: false,
  }
);

const Word = mongoose.model("Word", wordSchema);

module.exports = Word;
