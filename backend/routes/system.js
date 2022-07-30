// Required
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// Controller Required

const systemController = require("../controllers/system");

// History Post
router.get("/lastUser", auth, systemController.lastUser);
router.get("/topPost", auth, systemController.topPost);
router.post("/liveSearchUser", auth, systemController.liveSearchUser);

module.exports = router;
