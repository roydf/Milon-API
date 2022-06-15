//Check that the user input a valid query.
const validator = require("validator");
const User = require("../models/user.js");
const checkKeys = async (req, res, next) => {
  try {
    if (!req.query.apikey) {
      throw new Error("Missing api key!");
    } else {
      const key = await User.findOne({ apiKey: req.query.apikey });
      if (!key) {
        throw new Error("Api key is invalid!");
      }
    }

    if (!req.query.word) {
      throw new Error("Missing word query!");
    }
    next();
  } catch (e) {
    res.status(400).send(e.message);
  }
};

//Get the langauge dictionary key if its english or hebrew else return false.
const getLangaugeKey = (word) => {
  if (validator.isAlpha(word, ["en-US"], { ignore: " " })) {
    return "enTranslation";
  } else if (validator.isAlpha(word, ["he"], { ignore: " " })) {
    return "hebTranslation";
  } else {
    return false;
  }
};

module.exports = {
  checkKeys: checkKeys,
  getLangaugeKey: getLangaugeKey,
};
