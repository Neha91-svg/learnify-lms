const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const User = require("../models/User");

const getMyCourses = async (req, res) => {
    try {
        const studentId = req.user.id;

       
        const user = await User.findById(studentId).populate({
            path: "enrolledCourses",
            select: "title description price modules"
        });

        res.json(user.enrolledCourses || []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch courses" });
    }
};

const getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId)
            .populate({
                path: "modules",
                populate: {
                    path: "lessons",
                    model: "Lesson"
                }
            });

        if (!course) return res.status(404).json({ message: "Course not found" });

        res.json({ course });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch course details" });
    }
};

module.exports = {
    getMyCourses,
    getCourseDetails,
};
