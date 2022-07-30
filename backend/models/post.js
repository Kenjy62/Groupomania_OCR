const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  imageUrl: { type: String, required: false },
  createAt: { type: Date, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String], required: true },
  usersDisliked: { type: [String], required: true },
  edit: { type: Number, required: true },
  comments: {
    type: [
      {
        author: { type: String },
        text: { type: String },
        createAt: { type: Date },
        avatar: "",
        isRead: { type: Boolean, required: true },
      },
    ],
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Post", postSchema);
