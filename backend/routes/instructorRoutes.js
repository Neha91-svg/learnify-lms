const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const instructor = require("../middleware/instructor");
const Course = require("../models/Course");
const upload = require("../middleware/upload");

const {
  createCourse,
  updateCourse,
  addModule,
  addLesson,
  getDashboard,
  getCourseDetails,
  getCourseLessons,
  getFullCourse,
  updateModule,
  deleteModule,
  addLessonToModule,
  editLesson,
  deleteLesson,
  getInstructorCourses,
  getInstructorProfile,
  updateInstructorProfile,
  deleteCourse,




} = require("../controllers/instructorController");

// Instructor routes
router.post("/course/create", auth, instructor, createCourse);
router.put("/course/:id/update", auth, instructor, upload.single("thumbnail"), updateCourse);
router.post("/course/:cid/module/add", auth, instructor, addModule);
router.post("/course/:cid/lesson/add", auth, instructor, addLesson);
router.get("/dashboard", auth, instructor, getDashboard);
router.get("/courses/:courseId", auth, instructor, getCourseDetails);
router.get("/courses/:courseId/lessons", auth, instructor, getCourseLessons); // optional if separate

router.get("/course/:courseId/full", auth, instructor, getFullCourse);
router.put("/course/:courseId/module/:moduleId/edit", auth, instructor, updateModule);
router.delete("/course/:courseId/module/:moduleId", auth, instructor, deleteModule);

router.post("/course/:courseId/module/:moduleId/lesson/add", auth, instructor, addLessonToModule);
router.put("/course/:courseId/module/:moduleId/lesson/:lessonId/edit", auth, instructor, editLesson);
router.delete("/course/:courseId/module/:moduleId/lesson/:lessonId", auth, instructor, deleteLesson);
router.get("/my-courses", auth, instructor, getInstructorCourses);

router.delete(
  "/course/:id/delete",
  auth,
  instructor,
  deleteCourse
);




router.get("/profile", auth, instructor, getInstructorProfile);
router.put(
  "/profile/update",
  auth,
  instructor,
  upload.single("avatar"),
  updateInstructorProfile
);

module.exports = router;
