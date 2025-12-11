const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getLessonById } = require("../controllers/lessonController");

router.get("/:id", auth, getLessonById);

module.exports = router;
