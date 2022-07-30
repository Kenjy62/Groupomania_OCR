const User = require("../models/user");
const Post = require("../models/post");

exports.setAdmin = (req, res, next) => {
  User.findOne({ name: req.body.name })
    .then((result) => {
      if (result.admin) {
        User.updateOne({ name: req.body.name }, { admin: false }).then(() =>
          res.status(200).json({ isAdmin: false })
        );
      } else {
        User.updateOne({ name: req.body.name }, { admin: true }).then(() =>
          res.status(200).json({ isAdmin: true })
        );
      }
    })
    .catch((error) => res.status(400).json({ error: "User not found" }));
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({ name: req.body.name })
    .then(() => {
      Post.deleteMany({ author: req.body.name })
        .then(() => {
          Post.updateMany({ $pull: { comments: { author: req.body.name } } })
            .then((result) => res.status(200).json({ message: "User Delete" }))
            .catch((error) => res.status(400).json({ error: error }));
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => res.status(400).json({ error }));
};
