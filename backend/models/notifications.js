const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var notificationsScheme = new mongoose.Schema({
  receiver: { type: String, required: true },
  sender: { type: String, required: true },
  type: { type: String, required: true },
  isRead: { type: Boolean, required: true },
  when: { type: Date, required: true },
  postId: { type: String, required: true },
});

//Export the model
module.exports = mongoose.model("notifications", notificationsScheme);
