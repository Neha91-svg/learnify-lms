const mongoose = require("mongoose");
const lessonSchema = require("./Lesson");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String },

    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    modules: [
        {
            title: String,
            lessons: [lessonSchema]  
        }
    ],

    price: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

    enrolledStudents: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
