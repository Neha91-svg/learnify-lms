const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
});

const moduleSchema = new mongoose.Schema(
    {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
        title: { type: String, required: true },
        description: { type: String, default: "" },
        lessons: [lessonSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Module", moduleSchema);
