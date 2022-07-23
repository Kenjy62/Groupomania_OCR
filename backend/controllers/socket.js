const { Server } = require("socket.io");
const io = new Server();

const User = require("../models/user");
const mongoose = require("mongoose");

var Socket = {
  emit: function (event, data) {
    console.log(event, data);
    io.sockets.emit(event, data);
  },

  to: function (socketid, event, data) {
    console.log(socketid, event, data);
    io.to(socketid).emit(event, data);
  },

  all: function (event, data) {
    console.log(event, data);
    io.emit(event, data);
  },
};

io.on("connection", function (socket) {
  console.log("A user connected => " + socket.id);

  socket.on("init", (userId) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(userId) },
      { socket: socket.id }
    )
      .then((success) => {
        console.log(success);
      })
      .catch((error) => console.log(error));
  });
});

exports.Socket = Socket;
exports.io = io;
