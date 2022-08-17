const { Server } = require("socket.io");
const io = new Server();

const User = require("../models/user");
const mongoose = require("mongoose");

var SocketList = [];

var Socket = {
  emit: function (event, data) {
    console.log(event, data);
    io.sockets.emit(event, data);
  },

  to: function (userId, event, data) {
    console.log(SocketList);
    console.log(userId, event, data);
    const s = SocketList.find((item) => item.userId === userId);
    if (s) {
      io.to(s.socketId).emit(event, data);
    } else {
      console.log("not-connected");
    }
  },

  all: function (event, data) {
    console.log(event, data);

    io.emit(event, data);
  },
};

io.on("connection", function (socket) {
  console.log("A user connected => " + socket.id);

  socket.on("init", (userId, userName) => {
    const alreadyInArray = SocketList.findIndex(
      (item) => item.userId === userId
    );
    console.log(alreadyInArray);
    if (alreadyInArray > -1) {
      SocketList.splice(alreadyInArray, 1);
    }
    SocketList.push({
      socketId: socket.id,
      userId: userId,
      name: userName,
    });
  });

  socket.on("disconnect", (reason) => {
    console.log("User disconnected => " + reason);
  });

  socket.on("ForceDisconnect", (sid) => {
    console.log("User disconnected => " + sid);
    let index = SocketList.findIndex((key) => key.socketId === sid);
    SocketList.splice(index, 1);
    console.log(SocketList);
  });
});

exports.Socket = Socket;
exports.io = io;
