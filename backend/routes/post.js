// Required
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

// Controller Required
const postController = require('../controllers/post')

// Roads

// Add Post
router.get('/:skip/:limit', postController.getAll)
router.post('/add', auth, multer, postController.add)
router.post('/test/:postId', postController.setReaction)
router.post('/:postId/delete', auth, postController.delete)
router.post('/:postId/update', auth, multer, postController.update)

// Find User Post for Profil

router.get('/:username', postController.getPostByUser)

// EXPORTS
module.exports = router