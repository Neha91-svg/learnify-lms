const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const User = require("../models/User");
const Module = require("../models/Module");

const createCourse = async (req, res) => {
    try {
        const { title, description, price } = req.body;

        const course = await Course.create({
            title,
            description,
            price,
            instructor: req.user.id,
            status: "pending", 
        });

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        if (course.instructor.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const { title, description, price, status } = req.body;
        course.title = title || course.title;
        course.description = description || course.description;
        course.price = price || course.price;
        if (status) course.status = status;

        if (req.file) {
            course.thumbnail = req.file.filename;
        }

        await course.save();
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const addModule = async (req, res) => {
    try {
        const { cid } = req.params; 
        const { title, description } = req.body;

        const course = await Course.findById(cid);
        if (!course) return res.status(404).json({ message: "Course not found" });

        const newModule = {
            title: title || "Untitled Module",
            description: description || "",
            lessons: []
        };

        course.modules.push(newModule);
        await course.save();

        res.status(201).json({ message: "Module added", module: newModule });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add module" });
    }
};


const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) return res.status(404).json({ message: "Course not found" });

        if (course.instructor.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await course.deleteOne();

        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteModule = async (req, res) => {
    try {
        const { courseId, moduleId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Filter out the module to delete
        course.modules = course.modules.filter(
            (mod) => mod._id.toString() !== moduleId
        );

        await course.save();

        res.json({ message: "Module deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete module" });
    }
};

const getInstructorCourses = async (req, res) => {
    try {
        const instructorId = req.user.id;

        const courses = await Course.find({ instructor: instructorId })
            .populate({
                path: "modules",
                populate: {
                    path: "lessons",
                    model: "Lesson"
                }
            });

        res.json({ courses });
    } catch (error) {
        console.error("Error fetching instructor courses:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const addLessonToModule = async (req, res) => {
    try {
        const { courseId, moduleId } = req.params;
        const { title, content, videoUrl } = req.body;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        const module = course.modules.id(moduleId);
        if (!module) return res.status(404).json({ message: "Module not found" });

        module.lessons.push({
            title,
            content,
            videoUrl,
        });

        await course.save();

        res.status(201).json({ message: "Lesson added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add lesson" });
    }
};


const editLesson = async (req, res) => {
    try {
        const { lessonId } = req.params;
        const { title, content, videoUrl } = req.body;

        const lesson = await Lesson.findByIdAndUpdate(
            lessonId,
            { title, content, videoUrl },
            { new: true }
        );

        if (!lesson) return res.status(404).json({ message: "Lesson not found" });

        res.json({ message: "Lesson updated", lesson });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteLesson = async (req, res) => {
    try {
        const { courseId, moduleId, lessonId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        const module = course.modules.id(moduleId);
        if (!module) return res.status(404).json({ message: "Module not found" });

        // remove id from array
        module.lessons = module.lessons.filter(
            (l) => String(l) !== String(lessonId)
        );

        await course.save();

        await Lesson.findByIdAndDelete(lessonId);

        res.json({ message: "Lesson deleted" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateModule = async (req, res) => {
    try {
        const { courseId, moduleId } = req.params; 
        const { title, description } = req.body;

        if (!courseId || !moduleId) {
            return res.status(400).json({ message: "CourseId or ModuleId missing" });
        }

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        const module = course.modules.id(moduleId);
        if (!module) return res.status(404).json({ message: "Module not found" });

        module.title = title || module.title;
        module.description = description || module.description;

        await course.save();
        res.json({ message: "Module updated", module });
    } catch (err) {
        console.error("Update Module Error:", err);
        res.status(500).json({ message: "Failed to update module" });
    }
};

 const addLesson = async (req, res) => {
    try {
        const { courseId, moduleId } = req.params;
        const { title, content, videoUrl } = req.body;

        const lesson = await Lesson.create({ title, content, videoUrl });

        await Course.updateOne(
            { _id: courseId, "modules._id": moduleId },
            {
                $push: {
                    "modules.$.lessons": lesson._id,
                },
            }
        );

        res.json({ message: "Lesson added successfully", lesson });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};
const getDashboard = async (req, res) => {
    try {
        const instructorId = req.user._id;

        const courses = await Course.find({ instructor: instructorId })
            .select("title description price status createdAt")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            courses,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to load instructor courses" });
    }
};

const getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId); 
        if (!course) return res.status(404).json({ message: "Course not found" });

        
        const lessons = await Lesson.find({ course: courseId });

        res.json({ course, lessons });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};



const getCourseLessons = async (req, res) => {
    try {
        const { courseId } = req.params;

        const lessons = await Lesson.find({ course: courseId }).sort({ createdAt: 1 }); 

        res.json(lessons); 
    } catch (err) {
        console.error("Error fetching lessons:", err);
        res.status(500).json({ message: "Server error" });
    }
};

const getFullCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId)
            .populate({
                path: "modules.lessons",
                model: "Lesson",
            });

        if (!course) return res.status(404).json({ message: "Course not found" });

        res.json({
            course,
            modules: course.modules,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};


const getInstructorProfile = async (req, res) => {
    try {
        const profile = await User.findById(req.user.id).select("-password");
        res.json({ success: true, profile });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const updateInstructorProfile = async (req, res) => {
    try {
        const { name, email, bio } = req.body;

        const updatedData = {
            name,
            email,
            bio,
        };

        if (req.file) {
            updatedData.avatar = `/uploads/${req.file.filename}`;
        }

        const updatedProfile = await User.findByIdAndUpdate(
            req.user.id,
            updatedData,
            { new: true }
        ).select("-password");

        res.json({
            success: true,
            message: "Profile updated successfully",
            profile: updatedProfile,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed to update profile",
        });
    }
};


const getFullCourseDetails = async (req, res) => {
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

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json(course);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch course details" });
    }
};


module.exports = {
    createCourse,
    updateCourse,
    addModule,
    addLesson,
    getDashboard,
    getCourseDetails,
    getCourseLessons,
    getFullCourse,
    deleteModule,
    addLessonToModule,
    editLesson,
    deleteLesson,
    updateModule,
    getInstructorCourses,
    getInstructorProfile,
    updateInstructorProfile,
    deleteCourse,
    getFullCourseDetails,
};
