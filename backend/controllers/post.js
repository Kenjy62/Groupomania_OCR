const Post = require("../models/post");
const User = require("../models/user");
const Notifications = require("../models/notifications");
const PostHistory = require("../models/post_history");
const mongoose = require("mongoose");

const { Socket } = require("./socket");

// Functions
exports.add = (req, res, next) => {
  const post = new Post({
    ...req.body,
    imageUrl: req.files.image ? `/images/${req.files.image[0].filename}` : "",
    createAt: new Date(),
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    edit: 0,
    comments: [],
    history: [],
  });
  post
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post Create",
        imageUrl: req.file ? `${req.file.filename}` : "",
      });
      User.updateOne(
        { name: req.body.author },
        { $inc: { postsCount: 1 } }
      ).then(() => {
        console.log("Post +1");
      });
    })
    .catch((error) => res.status(400).json({ error: "Post sans contenue!" }));
};

exports.getAll = (req, res, next) => {
  let skip = parseInt(req.params.skip);
  let limit = parseInt(req.params.limit);

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
    { $sort: { createAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]).then((post) => {
    res.status(200).json(post);
  });
};

exports.setReaction = (req, res, next) => {
  const postId = req.params.postId;

  switch (req.body.reaction) {
    case 1:
      Post.findOneAndUpdate(
        { _id: postId },
        { $inc: { likes: 1 }, $push: { usersLiked: req.body.name } }
      )
        .then((result) => {
          User.findOne({ name: result.author }).then((data) => {
            if (data.name != req.body.name) {
              console.log("here");
              let id = data._id.toString();
              Socket.to(id, "notify", "newLike");
              User.updateOne(
                { name: data.name },
                { $inc: { unreadNotify: 1 } }
              ).then(() => {
                console.log("Post +1");
              });
            } else {
              console.log("same");
            }
          });
          const Notification = new Notifications({
            receiver: result.author,
            sender: req.body.name,
            type: "newLike",
            isRead: false,
            when: new Date(),
            postId: postId,
          });

          Notification.save()
            .then((success) => res.status(200).json({ message: "Like added" }))
            .catch((error) => console.log(error));
        })
        .catch((error) => res.status(400).json({ error: error }));
      break;

    case 0:
      Post.findOne({ _id: postId }).then((post) => {
        if (post.usersLiked.includes(req.body.name)) {
          Post.updateOne(
            { _id: postId },
            { $inc: { likes: -1 }, $pull: { usersLiked: req.body.name } }
          )
            .then(() =>
              res.status(200).json({ message: "Like remove", state: "like" })
            )
            .catch((error) => res.status(400).json({ error: error }));
        } else if (post.usersDisliked.includes(req.body.name)) {
          Post.updateOne(
            { _id: postId },
            { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.name } }
          )
            .then(() =>
              res
                .status(200)
                .json({ message: "Dislike remove", state: "dislike" })
            )
            .catch((error) => res.status(400).json({ error: error }));
        }
      });
      break;

    case -1:
      Post.findOneAndUpdate(
        { _id: postId },
        { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.name } }
      )
        .then((result) => {
          User.findOne({ name: result.author }).then((data) => {
            if (data.name != req.body.name) {
              console.log("here");
              let id = data._id.toString();
              Socket.to(id, "notify", "newLike");
              User.updateOne(
                { name: data.name },
                { $inc: { unreadNotify: 1 } }
              ).then(() => {
                console.log("Post +1");
              });
            } else {
              console.log("same");
            }
          });
          const Notification = new Notifications({
            receiver: result.author,
            sender: req.body.name,
            type: "newDislike",
            isRead: false,
            when: new Date(),
            postId: postId,
          });
          Notification.save()
            .then(() => res.status(200).json({ message: "Added dislike" }))
            .catch((error) => console.log(error));
        })
        .catch((error) => res.status(400).json({ error: error }));
      break;
  }
};

exports.delete = (req, res, next) => {
  let postId = req.params.postId;

  Post.findOne({ _id: postId }).then((post) => {
    Post.deleteOne({ _id: postId })
      .then(() => {
        res.status(200).json({ message: "Post delete!" });
        User.updateOne(
          { name: post.author },
          { $inc: { postsCount: -1 } }
        ).then(() => console.log("post +1"));
      })
      .catch((error) => res.status(400).json({ error: error }))
      .catch((error) => res.status(400).json({ error: error }));
  });
};

exports.deleteComment = (req, res, next) => {
  let commentsId = mongoose.Types.ObjectId(req.params.commentsId);
  let postId = mongoose.Types.ObjectId(req.body.id);

  Post.findByIdAndUpdate(
    { _id: postId },
    { $pull: { comments: { _id: commentsId } } },
    { safe: true, multi: true }
  )
    .then((result) => res.status(200).json({ message: "ok" }))
    .catch((err) => res.status(400).json({ err }));
};

exports.update = (req, res, next) => {
  let postId = mongoose.Types.ObjectId(req.params.postId);

  const Obj =
    req.files && !req.body.imageState
      ? {
          ...req.body,
          imageUrl: `/images/${req.files.image[0].filename}`,
        }
      : req.body.imageState === "null"
      ? {
          ...req.body,
          imageUrl: "",
        }
      : req.body.imageState === "same"
      ? {
          ...req.body,
        }
      : null;

  Post.findOne({ _id: postId }).then((post) => {
    let postBackup = post;
    Post.updateOne(
      { _id: postId },
      { $set: { ...Obj, _id: postId }, $inc: { edit: 1 } }
    )
      .then((result) => {
        const postsave = new PostHistory({
          originalId: postBackup._id,
          text: postBackup.text,
          imageUrl: postBackup.imageUrl,
          updateAt: Date(),
          updateBy: req.body.user,
        });
        postsave
          .save()
          .then(() => res.status(200).json({ message: "Update" }))
          .catch((error) => {
            res.status(400).json({ error: error });
            console.log(error);
          });
      })
      .catch((error) => res.status(400).json({ error: error }));
  });
};

exports.getPostByUser = (req, res, next) => {
  let user = req.params.username;

  let skip = parseInt(req.params.skip);
  let limit = parseInt(req.params.limit);

  Post.aggregate([
    { $match: { author: user } },
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
    { $sort: { createAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ])
    .sort({ createAt: -1 })
    .then((post) => {
      console.log(post);
      if (post.length > 0) {
        res.status(200).json({ post: post });
      } else {
        res.status(200).json({ post: false });
      }
    })
    .catch((error) => res.status(400).json({ error: error }));
};

exports.addComment = (req, res, next) => {
  Post.find({ _id: req.body.postId })
    .then((post) => {
      if (post.length > 0) {
        Post.updateOne(
          { _id: req.body.postId },
          {
            $push: {
              comments: {
                author: req.body.author,
                text: req.body.text,
                createAt: Date(),
                avatar: req.body.avatar,
                isRead: false,
              },
            },
          }
        )
          .then(() => {
            User.findOne({ name: post[0].author })
              .then((result) => {
                if (result.name != req.body.author) {
                  let id = result._id.toString();
                  Socket.to(id, "notify", "newComment");
                  User.updateOne(
                    { name: result.name },
                    { $inc: { unreadNotify: 1 } }
                  ).then(() => {
                    const Notification = new Notifications({
                      receiver: result.name,
                      sender: req.body.author,
                      type: "newComment",
                      isRead: false,
                      when: new Date(),
                      postId: req.body.postId,
                    });

                    Notification.save()
                      .then((success) =>
                        res.status(200).json({ message: "Add comments" })
                      )
                      .catch((error) => console.log(error));
                  });
                } else {
                  res.status(200).json({ message: "Add comments" });
                }
              })
              .catch((error) => res.status(400).json({ error: error }));
          })
          .catch((error) => res.status(400).json({ error: error }));
      }
    })
    .catch((error) => console.log(error));
};

exports.getDetails = async (req, res, next) => {
  const postId = req.params.postId;

  Post.findOne({ _id: postId })
    .then((data) => {
      if (data) {
        User.findOne({ name: data.author })
          .then((user) => {
            const obj = {
              ...data._doc,
              avatar: user.avatar,
            };
            res.status(200).json({ data: obj });
          })
          .catch((error) => res.status(400).json(error));
      }
    })
    .catch((error) => res.status(400).json(error));
};

exports.getHistory = (req, res, next) => {
  PostHistory.find({ originalId: mongoose.Types.ObjectId(req.params.postId) })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(400).json({ error: error }));
};
