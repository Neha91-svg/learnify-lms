const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const instructor = require("../middleware/instructor");
const { addLesson } = require("../controllers/lessonController");

router.post(
    "/course/:courseId/module/:moduleId/lesson/add",
    auth,
    instructor,
    addLesson
);

module.exports = router;
