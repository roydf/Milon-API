const jwt = require("jsonwebtoken");
const User = require("../models/user");

//Authenticate the user using his json web token.
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, "securest");
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      throw new Error();
    } else if (!user.tokens.includes(token)) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
