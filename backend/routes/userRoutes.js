const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {

    enrollCourse,
    getMyCourses,
    getLessonById,
    getProfile,
    updateProfile,
    changePassword,
    
} = require("../controllers/userController");


router.post("/courses/:id/enroll", auth, enrollCourse);
router.get("/my-courses", auth, getMyCourses);
router.get("/lesson/:id", auth, getLessonById);

router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.put("/change-password", auth, changePassword);

module.exports = router;
