const Post = require('../models/post')
const PostHistory = require('../models/post_history')
const fs = require('fs')

// Functions
exports.add = (req, res, next) => {
    console.log(req.body)
    const post = new Post({
        ...req.body,
        imageUrl: req.file? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '',
        createAt: Date(),
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        comments: [],
        history: [],
    }) 
    post.save()
    .then(() => res.status(201).json({message : 'Post Create', imageUrl: req.file? `${req.file.filename}` : ''}))
    .catch((error) => res.status(400).json({error: 'Post sans contenue!'}))   
}

exports.getAll = (req, res, next) => {
    let skip = req.params.skip
    let limit = req.params.limit
    
    Post.find().skip(skip).limit(limit).sort({createAt : -1})
        .then(post => { res.status(200).json(post) })
        .catch(error => res.status(404).json({error: 'Error'}))
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

exports.update = (req, res, next) => {
    console.log(req.body)

    let postId = req.params.postId

    const Obj = req.file? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body, imageUrl: ''}

   Post.findOne({_id: postId})
    .then(post => {
        let postBackup = post
            Post.updateOne({_id: postId}, {...Obj, _id: postId})
                .then(() => {
                    const postsave = new PostHistory({
                        originalId: postBackup._id,
                        text: postBackup.text,
                        imageUrl: postBackup.imageUrl,
                        updateAt : Date()
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

    Post.find({author: user})
        .then(post => {
            if(post.length > 0){
                res.status(200).json({post: post})
            } else {
                res.status(200).json({post: 'Aucun post pour le moment'})
            }
        })
        .catch((error) => res.status(400).json({error: error}))
}