//Models
const User = require("../models/user");
const Post = require("../models/post");
const Notifications = require("../models/notifications");

// Required
const bcrypt = require("bcrypt");
const salt = 10;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Functions
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, salt).then((hash) => {
    const user = new User({
      ...req.body,
      avatar: "/images/default-avatar.png",
      cover: "/images/default-cover.jpg",
      password: hash,
      admin: false,
      registerAt: new Date(),
      postsCount: 0,
      unreadNotify: 0,
    });

    user
      .save()
      .then(() => res.status(201).json({ message: "User Created" }))
      .catch((error) => {
        res.status(400).json({
          error: `Problème d'inscription, contacter l'administrateur`,
        });
        console.log(error);
      })
      .catch((error) =>
        res.status(500).json({
          error: `Erreur d'encryptage du mot de passe, contacter l'administrateur`,
        })
      );
  });
};

// Login
exports.login = (req, res, next) => {
  // Check if email exist
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      // If not exist
      if (!user) {
        return res.status(401).json({ error: "User not found!" });
      }

      // Else, Compare password
      bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          // If password wrong
          if (!result) {
            return res.stats(401).json({ error: "Wrong Password!" });
          }

          // Else
          return res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "test", { expiresIn: "24h" }),
          });
        })
        // bcrypt Error
        .catch((error) => res.status(500).json({ error: error }));
    })
    .catch((error) => res.status(500).json({ error: error }));
};

exports.getData = (req, res, next) => {
  User.findOne({
    _id: req.userId,
  })
    .then((data) => {
      return res.status(200).json({ data });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

exports.getProfil = (req, res, next) => {
  User.findOne({ name: req.params.username })
    .then((user) => {
      if (req.userId == user._id || req.params.admin) {
        res.status(200).json({ message: user });
      } else {
        (user._id = null),
          (user.password = null),
          (user.admin = null),
          res.status(200).json({ data: user });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.updateProfil = (req, res, next) => {
  User.findOne({ _id: mongoose.Types.ObjectId(req.body._id) })
    .then((user) => {
      const Obj = req.files
        ? {
            avatar: req.files.avatar
              ? `/images/${req.files.avatar[0].filename}`
              : user.avatar,
            cover: req.files.cover
              ? `/images/${req.files.cover[0].filename}`
              : user.cover,
          }
        : undefined;

      if (Obj) {
        User.updateOne(
          { _id: mongoose.Types.ObjectId(req.body._id) },
          { ...Obj, _id: req.body._id }
        )
          .then(() =>
            Post.updateMany(
              { "comments.author": user.name },
              {
                $set: {
                  "comments.$.avatar": req.files.avatar
                    ? `/images/${req.files.avatar[0].filename}`
                    : user.avatar,
                },
              }
            )
          )
          .then(() => {
            res.status(200).json({ message: "ok" });
          })
          .catch((error) => {
            res.status(400).json({ error: error });
            console.log(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: error });
    });
};

exports.markAsRead = (req, res, next) => {
  Notifications.updateMany(
    { receiver: req.body.userId },
    { $set: { isRead: true } }
  )
    .then(() => {
      User.updateOne({ name: req.body.userId }, { $set: { unreadNotify: 0 } })
        .then(() => res.status(200).json({ message: "ok" }))
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

exports.getNotifications = (req, res, next) => {
  console.log(req.params.userId);

  Notifications.aggregate([
    {
      $match: {
        receiver: req.params.userId,
        isRead: false,
        sender: { $ne: req.params.userId },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "sender",
        foreignField: "name",
        as: "senderdata",
      },
    },
    {
      $project: {
        senderdata: {
          _id: 0,
          name: 0,
          lastName: 0,
          password: 0,
          admin: 0,
          email: 0,
          __v: 0,
          registeredAt: 0,
          socket: 0,
          postsCount: 0,
          unreadNotify: 0,
        },
      },
    },
  ])
    .sort({ createAt: -1 })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => console.log(error));
};
