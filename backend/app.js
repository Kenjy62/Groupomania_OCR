// Required
const mongoose = require("mongoose");
const hostname = "192.168.1.19";
const port = 3000;
const express = require("express");
const app = express();
const path = require("path");
const moment = require("moment");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const http = require("http");

const server = http.createServer(app);

const { io } = require("./controllers/socket");
io.attach(server, {
  cors: { origin: "*" },
});

// Roads
const userRoads = require("./routes/user");
const postRoads = require("./routes/post");
const historyRoads = require("./routes/post_history");
const adminRoads = require("./routes/admin");
const systemRoads = require("./routes/system");
const notificationsRoads = require("./routes/notifications");

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
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  res.setHeader("Cross-Origin-Resource-Policy", "*");
  next();
});

// App Use
app.use(morgan("dev"));
// app.use(morgan("prod"));
app.use(express.json());
app.use("/api/images", express.static(path.join(__dirname, "images")));

// Api Roads
app.use("/api/auth", userRoads);
app.use("/api/post", postRoads);
app.use("/api/history", historyRoads);
app.use("/api/admin", adminRoads);
app.use("/api/system", systemRoads);
app.use("/api/notifications", notificationsRoads);

// App Listen
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(moment().format("DD MMMM HH:mm"));
});
