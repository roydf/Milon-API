const express = require("express");
const User = require("../models/user.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

//Request to create a user.
router.post("/user", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.generateApiKey();
    await user.generateAuthToken();
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Request to login.
router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    await user.generateAuthToken();
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Request to logout.
router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token !== req.token);
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//Request to get a new api key.
router.patch("/user/newkey", auth, async (req, res) => {
  try {
    const newKey = await req.user.generateApiKey();
    req.user.save();
    res.send(newKey);
  } catch (e) {
    res.status(500).send();
  }
});

//Delete the user.
router.delete("/user", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send("User deleted!");
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
