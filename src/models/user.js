const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Create the user base model.
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
    },
    apiKey: {
      type: String,
      unique: true,
      required: true,
    },
    tokens: {
      type: Array,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

//Checks if the login data is correct and match a user.
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login.");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login.");
  }
  return user;
};

//Generate an api key for the user.
userSchema.methods.generateApiKey = async function () {
  const key = jwt.sign({ _id: this._id.toString() }, "thisissparta");
  this.apiKey = key;
  return key;
};

//Generate authentication token for the user.
userSchema.methods.generateAuthToken = async function () {
  const authToken = jwt.sign({ _id: this._id.toString() }, "securest");
  this.tokens.push(authToken);
  return authToken;
};

//Filter all secure or irrelevant data.
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject._id;
  delete userObject.email;
  delete userObject.password;
  return userObject;
};

//hash the password using bcrypt hashing algorithem.
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
