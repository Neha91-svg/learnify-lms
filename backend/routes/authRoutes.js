const express = require("express");
const router = express.Router();
const {
    signup,
    login,
    logoutUser,
} = require("../controllers/authController");

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logoutUser);


module.exports = router;
