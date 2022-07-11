const Post = require('../models/post')
const User = require('../models/user')
const PostHistory = require('../models/post_history')
const mongoose = require('mongoose')


// Functions
exports.add = (req, res, next) => {
    console.log(req.body)
    const post = new Post({
        ...req.body,
        imageUrl: req.files.image? `${req.protocol}://${req.get('host')}/images/${req.files.image[0].filename}` : '',
        createAt: new Date(),
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        edit: 0,
        comments: [],
        history: [],
    }) 
    post.save()
    .then(() => res.status(201).json({message : 'Post Create', imageUrl: req.file? `${req.file.filename}` : ''}))
    .catch((error) => res.status(400).json({error: 'Post sans contenue!'}))   
}

exports.getAll = (req, res, next) => {
    let skip = parseInt(req.params.skip)
    let limit = parseInt(req.params.limit)

    console.log(skip)
    console.log(limit)
    
    Post.aggregate([
        { $lookup: { 
            from: 'users', 
            localField: 'author', 
            foreignField: 'name', 
            as :'userdata'},
        }, 
        { $project: {
            userdata: { 
                _id: 0, 
                name: 0, 
                lastName: 0, 
                password: 0, 
                admin: 0, 
                email: 0, 
                __v: 0 }
        }
        }, {$skip: skip}, {$limit: limit}
    ]).sort({createAt: -1})
                    .then(post => {
                        res.status(200).json(post)
                    })
}

exports.setReaction = (req, res, next) => {
    const postId = req.params.postId
    console.log(req.body)

    switch(req.body.reaction){
        case 1 : 
            Post.updateOne({_id: postId}, {$inc: {likes: 1}, $push: {usersLiked: req.body.name}})
                .then(() => res.status(200).json({message: 'Liked'}))
                .catch((error) => res.status(400).json({error: error}))
        break;
        
        case 0 : 
            Post.findOne({_id: postId})
                .then(post => {
                    if(post.usersLiked.includes(req.body.name)){
                        Post.updateOne({_id: postId}, {$inc: {likes: -1}, $pull: {usersLiked: req.body.name}})
                            .then(() => res.status(200).json({message: 'Like remove', state: 'like'}))
                            .catch((error) => res.status(400).json({error: error}))
                    } else if(post.usersDisliked.includes(req.body.name)){
                        Post.updateOne({_id: postId}, {$inc: {dislikes: -1}, $pull: {usersDisliked: req.body.name}})
                            .then(() => res.status(200).json({message: 'Dislike remove', state: 'dislike'}))
                            .catch((error) => res.status(400).json({error: error}))
                    }
                })
        break;

        case -1 : 
            Post.updateOne({_id: postId}, {$inc: {dislikes: 1}, $push: {usersDisliked: req.body.name}})
                .then(() => res.status(200).json({message: 'Disliked'}))
                .catch((error) => res.status(400).json({error: error}))
        break;
    }    
}

exports.delete = (req, res, next) => {
    let postId = req.params.postId
    
    Post.findOne({_id: postId})
        .then((post) => {
            Post.deleteOne({_id: postId})
                .then(() => res.status(200).json({message: 'Post delete!'}))
                .catch((error) => res.status(400).json({error: error}))
        .catch((error) => res.status(400).json({error: error}))
        })
}

exports.deleteComment = (req, res, next) => {
    
    let commentsId = mongoose.Types.ObjectId(req.params.commentsId);
    let postId = mongoose.Types.ObjectId(req.body.id)

    Post.findByIdAndUpdate({_id: postId}, {$pull: {'comments': {_id: commentsId}}}, {safe: true, multi: true})
        .then(result => res.status(200).json({message: 'ok'}))
        .catch((err) => res.status(400).json({err}))
}

exports.update = (req, res, next) => {

    let postId = mongoose.Types.ObjectId(req.params.postId)

    const Obj = req.files && !req.body.imageState? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.files.image[0].filename}`,
    } : req.body.imageState === 'null'? {
        ...req.body,
        imageUrl : '',
    } : req.body.imageState === 'same'? {
        ...req.body,
    } : null

   Post.findOne({_id: postId})
    .then(post => {
        let postBackup = post
            Post.updateOne({_id: postId}, {$set: {...Obj, _id: postId}, $inc: {edit: 1}})
                .then((result) => {
                    console.log(result)
                    const postsave = new PostHistory({
                        originalId: postBackup._id,
                        text: postBackup.text,
                        imageUrl: postBackup.imageUrl,
                        updateAt : Date(),
                        updateBy : req.body.user
                    })
                    postsave.save()
                        .then(() => res.status(200).json({message: 'Update'}))
                        .catch((error) => {res.status(400).json({error: error}); console.log(error)})
                })
                .catch((error) => res.status(400).json({error: error}))
    })
}

exports.getPostByUser = (req, res, next) => {
    let user = req.params.username

    Post.aggregate([
        {$match: { author: user}},
        { $lookup: { 
            from: 'users', 
            localField: 'author', 
            foreignField: 'name', 
            as :'userdata'},
        }, 
        { $project: {
            userdata: { 
                _id: 0, 
                name: 0, 
                lastName: 0, 
                password: 0, 
                admin: 0, 
                email: 0, 
                __v: 0 }
        }
        }
    ]).sort({createAt: -1})
    .then(post => {
        res.status(200).json({post: post})
    })
}

exports.addComment = (req, res, next) => {
    console.log(req.body)

    Post.find({_id: req.body.postId})
        .then(post => {
            if(post.length > 0){
                Post.updateOne({_id: req.body.postId}, {$push: {'comments': {author: req.body.author, text: req.body.text, createAt: Date(), avatar: req.body.avatar}}})
                .then(() => res.status(200).json({message: 'Add comments'}))
                .catch((error) => res.status(400).json({error: error}))
            }
        })
        .catch(error => console.log(error))
}

exports.getDetails = async (req, res, next) => {
    const postId = req.params.postId

    Post.findOne({_id: postId})
        .then(data => {
            if(data){
               User.findOne({name: data.author})
               .then(user => {
                   const obj = {
                        ...data._doc,
                        avatar: user.avatar
                    }
                    res.status(200).json({data: obj})
        })
        .catch(error => console.log(error))
        }
    })
}

exports.getHistory = (req, res, next) => {
    PostHistory.find({originalId: mongoose.Types.ObjectId(req.params.postId)})
        .then((result) => res.status(200).json({result}))
        .catch((error) => res.status(400).json({error: error}))
}