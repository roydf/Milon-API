const express = require("express");
const keyValidator = require("../middleware/valid-keys.js");
const mongoose = require("mongoose");
const Word = require("../models/words");

const router = express.Router();

//Fetch the required word from the dictionary.
router.get("/words", keyValidator.checkKeys, async (req, res) => {
  const word = req.query.word;
  const langauge = keyValidator.getLangaugeKey(word);
  if (!langauge) {
    return res
      .status(400)
      .send("Only words in hebrew and english are allowed!");
  }
  const dictItem = await Word.find({ [langauge]: word }, { _id: 0 });
  if (!dictItem.length) {
    return res.status(404).send("Word not found!");
  }
  res.send(dictItem);
});

module.exports = router;
