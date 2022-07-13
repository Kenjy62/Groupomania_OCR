// Required
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const adminController = require('../controllers/admin')


// Controller Required

// History Post
router.post('/setAdmin', auth, adminController.setAdmin)

module.exports = router