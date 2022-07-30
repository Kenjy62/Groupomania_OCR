const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// Controller Required
const userController = require("../controllers/user");

// Notifications
router.post("/markasread", auth, userController.markAsRead);
router.get("/all/:userId", auth, userController.getNotifications);

// EXPORTS
module.exports = router;
