const User = require("../models/user");
const Post = require("../models/post");

exports.lastUser = (req, res, next) => {
  User.find()
    .sort({ registerAt: -1 })
    .limit(5)
    .then((result) => res.status(200).json({ data: result }))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.topPost = (req, res, next) => {
  console.log("here");

  Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "name",
        as: "userdata",
      },
    },
    {
      $project: {
        userdata: {
          _id: 0,
          name: 0,
          lastName: 0,
          password: 0,
          admin: 0,
          email: 0,
          __v: 0,
        },
      },
    },
  ])
    .sort({ likes: -1 })
    .limit(5)
    .then((post) => {
      res.status(200).json({ data: post });
    })
    .catch((error) => res.status(400).json(error));
};
