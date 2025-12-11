const express = require("express");
const router = express.Router();
const { getAllCourses, getCourseById, getAllLessonsOfCourse } = require("../controllers/courseController");

router.get("/all", getAllCourses);
router.get("/:id", getCourseById);
router.get("/:id/lessons", getAllLessonsOfCourse);


module.exports = router;
