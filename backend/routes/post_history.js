// Required
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

// Controller Required
const postController = require('../controllers/post')

// History Post
router.get('/:postId', auth, postController.getHistory)

module.exports = router