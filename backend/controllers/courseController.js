const Course = require("../models/Course");
const Lesson = require("../models/Lesson");

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ status: "approved" }).populate(
            "instructor",
            "name email"
        );
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate("instructor", "name email")
            .populate({ path: "lessons", select: "title content videoUrl" });

        if (!course) return res.status(404).json({ message: "Course not found" });

        res.json(course);
    } catch (error) {
        console.error("Error fetching course:", error.message); 
        res.status(500).json({ message: error.message });
    }
};

const getAllLessonsOfCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate("lessons");
        if (!course) return res.status(404).json({ message: "Course not found" });

        res.json(course.lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    getAllLessonsOfCourse,
};
