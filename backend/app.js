// Required
const mongoose = require("mongoose");
<<<<<<< HEAD
const hostname = "127.0.0.1";
=======
const hostname = "192.168.1.19";
>>>>>>> notifySystem
const port = 3000;
const express = require("express");
const app = express();
const path = require("path");
const moment = require("moment");
const morgan = require("morgan");
<<<<<<< HEAD
const dotenv = require("dotenv").config();
=======
const http = require("http");

const server = http.createServer(app);

const { io } = require("./controllers/socket");
io.attach(server, {
  cors: { origin: "*" },
});
>>>>>>> notifySystem

// Roads
const userRoads = require("./routes/user");
const postRoads = require("./routes/post");
const historyRoads = require("./routes/post_history");
const adminRoads = require("./routes/admin");
const systemRoads = require("./routes/system");
<<<<<<< HEAD
=======
const notificationsRoads = require("./routes/notifications");
>>>>>>> notifySystem

// Connect MongoDB at default port 27017.

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://genji:061297301277@cluster0.qunncwa.mongodb.net/groupomania?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

//Définition des CORS
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
<<<<<<< HEAD
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
=======
  res.setHeader("Cross-Origin-Resource-Policy", "*");
>>>>>>> notifySystem
  next();
});

// App Use
<<<<<<< HEAD
app.use(morgan("dev"));
=======
// app.use(morgan("prod"));
>>>>>>> notifySystem
app.use(express.json());
app.use("/api/images", express.static(path.join(__dirname, "images")));

// Api Roads
app.use("/api/auth", userRoads);
app.use("/api/post", postRoads);
app.use("/api/history", historyRoads);
app.use("/api/admin", adminRoads);
app.use("/api/system", systemRoads);
<<<<<<< HEAD

// App Listen
app.listen(process.env.PORT, process.env.IP, () => {
=======
app.use("/api/notifications", notificationsRoads);

// App Listen
server.listen(port, hostname, () => {
>>>>>>> notifySystem
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(moment().format("DD MMMM HH:mm"));
});
