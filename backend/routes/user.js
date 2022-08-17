// Required
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Controller Required
const userController = require("../controllers/user");

// Roads

// Signup
router.post("/signup", userController.signup);

// Login
router.post("/login", userController.login);

// Get
router.get("/user/:token", auth, userController.getData);

// Profil
router.get("/profil/:username/:admin", auth, userController.getProfil);
router.post("/profil/:username", auth, multer, userController.updateProfil);

// EXPORTS
module.exports = router;
