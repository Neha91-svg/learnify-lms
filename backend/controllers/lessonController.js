const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

const getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id).populate(
            "course",
            "title"
        );
        if (!lesson) return res.status(404).json({ message: "Lesson not found" });

        res.json(lesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addLesson = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, content, videoUrl } = req.body;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to add lessons" });
        }

        const lesson = await Lesson.create({
            title,
            content,
            videoUrl,
            course: courseId,
        });

        course.lessons.push(lesson._id);
        await course.save();

        res.status(201).json({
            message: "Lesson added successfully",
            lesson,
        });

    } catch (err) {
        res.status(500).json({ message: "Error adding lesson", error: err.message });
    }
};


module.exports = {
    getLessonById,
    addLesson,
};
