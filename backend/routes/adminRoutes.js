const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  getAllUsers,
  getPendingCourses,
  getAllCourses,
  getApprovedCourses,
  getRejectedCourses,
  getAnalytics,
  getAllStudents,
  getAllInstructors,
  getAllModulesForAdmin,
  getLessonsByModule,
  getAdminAnalytics,
  getAdminProfile,
  updateAdminProfile,
  adminChangePassword,
  getStudentById,
  toggleBlockStudent,
  getInstructorById,
  updateCourseStatus,
} = require("../controllers/adminController");

// Admin routes
router.get("/users", auth, admin, getAllUsers);
router.get("/courses/pending", auth, admin, getPendingCourses);
router.get("/courses/approved", auth, admin, getApprovedCourses);
router.get("/analytics", auth, admin, getAnalytics);
router.get("/students", auth, admin, getAllStudents);
router.get("/instructors", auth, admin, getAllInstructors);
router.get("/courses", auth, admin, getAllCourses);
router.get("/courses/rejected", auth, admin, getRejectedCourses);
router.get("/modules", auth, admin, getAllModulesForAdmin);

router.get("/lessons/:moduleId", auth, admin, getLessonsByModule);

router.get("/", auth, admin, getAdminAnalytics);

router.get("/profile", auth, admin, getAdminProfile);
router.put("/profile/update", auth, admin, updateAdminProfile);
router.put("/profile/change-password", auth, admin, adminChangePassword);

router.get("/students/:id", getStudentById);          // GET student details
router.put("/students/block/:id", toggleBlockStudent);

router.get("/instructors/:id", getInstructorById);
router.put("/courses/:id/status", updateCourseStatus);

module.exports = router;
