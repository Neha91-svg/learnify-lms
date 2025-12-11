const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ status: "approved" }).populate("instructor", "name email");
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate("instructor", "name email")
            .populate("lessons");
        if (!course) return res.status(404).json({ message: "Course not found" });

        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const enrollCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });

      
        const user = await User.findById(req.user.id);
        if (!user.enrolledCourses.includes(course._id)) {
            user.enrolledCourses.push(course._id);
            await user.save();
        }

        if (!course.enrolledStudents.includes(user._id)) {
            course.enrolledStudents.push(user._id);
            await course.save();
        }

        res.json({ message: "Enrolled successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getMyCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: "enrolledCourses",
            populate: { path: "instructor", select: "name email" }
        });

        res.json(user.enrolledCourses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id).populate("course", "title");
        if (!lesson) return res.status(404).json({ message: "Lesson not found" });
        res.json(lesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // exclude password
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { name, email } = req.body;

        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { newPassword } = req.body;
        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: "New password must be at least 6 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();
        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
    getAllCourses,
    getCourseById,
    enrollCourse,
    getMyCourses,
    getLessonById,
    getProfile,
    updateProfile,
    changePassword,
};
