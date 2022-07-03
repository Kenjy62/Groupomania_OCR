// Required
const mongoose = require('mongoose')
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express')
const app = express();
const path = require('path')

// Roads
const userRoads = require('./routes/user')
const postRoads = require('./routes/post')
// Connect MongoDB at default port 27017.

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://genji:061297301277@cluster0.qunncwa.mongodb.net/groupomania?retryWrites=true&w=majority', {
    useNewUrlParser: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

//Définition des CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// App Use
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')))



app.use('/api/auth', userRoads)
app.use('/api/post', postRoads)

/* app.post('/api/login', function(req, res){
  User.findOne({name: req.body.email}).then(result => {
    if(!result){
      return res.status(401).json({error: 'User not found'})
    }
    res.status(200).json({user: result})
  })
}) */

// User.find({name: 'test'}).then((result) => console.log(result)).catch((error) => console.log(error))
 /* User.findOneAndUpdate({name: 'Test'}, {name: 'Updated'}).then(result => {
  if(result == null){
    return console.log('Not Found')
  }
  console.log('Updated')
  Post.updateMany({author: 'Test'}, {author: 'Updated'}).then(result => {
    if(result == null){
      return console.log('not post found')
    }

    console.log('Post Updated')
  })
}).catch(error => console.log(error)) */

/* Post.updateMany({usersLiked: 'test'}, {$set: {'usersLiked.$': 'LOL'}}).then(result => {
  if(result == null){
    return console.log('nop')
  }
  console.log('ok')
}) */

/* let post = new Post({
  author: 'Test15',
  text: 'test',
  createAt: Date(),
  likes: 0,
  dislikes: 0,
  usersLiked : [],
  userDisliked: []
}) */

// post.save().then(() => console.log('create'))

// App Listen
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});