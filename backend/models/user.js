const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  cover: {
    type: String,
    required: false,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  registerAt: {
    type: Date,
    required: true,
  },
  postsCount: {
    type: Number,
    required: true,
  },
  socket: {
    type: String,
    required: false,
  },
  unreadNotify: {
    type: Number,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("User", userSchema);
