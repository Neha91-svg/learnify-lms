const User = require("../models/User");
const Course = require("../models/Course");
const bcrypt = require("bcryptjs");


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllStudents = async (req, res) => {
    try {
       
        const students = await User.find({ role: "student" }).select("-password");
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getStudentById = async (req, res) => {
    try {
        const student = await User.findById(req.params.id)
            .select("-password")
            .populate("enrolledCourses"); // Agar courses details chahiye
        if (!student || student.role !== "student") {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllInstructors = async (req, res) => {
    try {
        const instructors = await User.find({ role: "instructor" }).select("-password");
        res.json(instructors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("instructor", "name email");
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





const getPendingCourses = async (req, res) => {
    try {
        const courses = await Course.find({ status: "pending" }).populate("instructor", "name email");
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getApprovedCourses = async (req, res) => {
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



const getRejectedCourses = async (req, res) => {
    try {
        const courses = await Course.find({ status: "rejected" }).populate(
            "instructor",
            "name email"
        );
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getAllModulesForAdmin = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate("modules.lessons")     
            .select("title modules");        

        res.json({
            message: "All modules fetched successfully",
            courses,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllLessons = async (req, res) => {
    try {
        const courses = await Course.find().populate({
            path: "modules",
            populate: {
                path: "lessons",
            },
        });

        let lessons = [];

        courses.forEach(course => {
            course.modules.forEach(mod => {
                mod.lessons.forEach(lsn => {
                    lessons.push({
                        course: course.title,
                        module: mod.title,
                        lessonId: lsn._id,
                        title: lsn.title,
                        description: lsn.description,
                        videoUrl: lsn.videoUrl || null,
                    });
                });
            });
        });

        res.json({ lessons });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getLessonsByModule = async (req, res) => {
    try {
        const { moduleId } = req.params;

        const course = await Course.findOne(
            { "modules._id": moduleId },
            { "modules.$": 1 }
        ).populate("modules.lessons");

        if (!course) {
            return res.status(404).json({ message: "Module not found" });
        }

        const moduleData = course.modules[0];

        res.json({
            module: moduleData.title,
            lessons: moduleData.lessons || []
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAdminAnalytics = async (req, res) => {
    try {
        const totalCourses = await Course.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalReviews = await Review.countDocuments();
        const totalEnrollments = await Enrollment.countDocuments();

        // monthly enrollment graph data
        const monthly = await Enrollment.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 },
                },
            },
            { $sort: { "_id": 1 } }
        ]);

        res.json({
            success: true,
            totalCourses,
            totalUsers,
            totalReviews,
            totalEnrollments,
            monthlyChart: monthly,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Analytics fetch failed" });
    }
};


const getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: "student" });
        const totalInstructors = await User.countDocuments({ role: "instructor" });
        const totalCourses = await Course.countDocuments();

        res.json({
            totalUsers,
            totalInstructors,
            totalCourses,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getAdminProfile = async (req, res) => {
    try {
        const admin = await User.findById(req.user.id).select("-password");

        res.json({ admin });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const updateAdminProfile = async (req, res) => {
    try {
        const { name, phone, bio } = req.body;

        const admin = await User.findByIdAndUpdate(
            req.user.id,
            { name, phone, bio },
            { new: true }
        ).select("-password");

        res.json({
            message: "Admin profile updated successfully",
            admin,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const adminChangePassword = async (req, res) => {
    try {
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({ message: "New password is required" });
        }

        const hash = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(req.user.id, { password: hash });

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const toggleBlockStudent = async (req, res) => {
    try {
        const student = await User.findById(req.params.id);
        if (!student || student.role !== "student") {
            return res.status(404).json({ message: "Student not found" });
        }
        student.isBlocked = !student.isBlocked;
        await student.save();
        res.json({ message: student.isBlocked ? "Blocked" : "Unblocked" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getInstructorById = async (req, res) => {
    try {
        const instructor = await User.findById(req.params.id).select("-password");
        if (!instructor || instructor.role !== "instructor") {
            return res.status(404).json({ message: "Instructor not found" });
        }
        res.json(instructor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateCourseStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; 

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const course = await Course.findById(id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        course.status = status;
        await course.save();

        res.json({ message: `Course ${status}`, course });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports = {
    getAllUsers,
    getAllStudents,
    getStudentById,
    getAllInstructors,
    getAllCourses,
    getPendingCourses,
    getApprovedCourses,
    getRejectedCourses,
    getAnalytics,
    getAllModulesForAdmin,
    getAllLessons,
    getLessonsByModule,
    getAdminAnalytics,
    getAdminProfile,
    updateAdminProfile,
    adminChangePassword,
    toggleBlockStudent,
    getInstructorById,
    updateCourseStatus,
};
