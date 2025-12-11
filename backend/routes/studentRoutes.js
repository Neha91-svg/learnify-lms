const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getMyCourses, getCourseDetails } = require("../controllers/studentController");

router.get("/my-courses", auth, getMyCourses);

router.get("/course/:courseId/full", auth, getCourseDetails);

module.exports = router;
