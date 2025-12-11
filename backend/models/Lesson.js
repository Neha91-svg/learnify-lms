const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, default: "" },
    videoUrl: { type: String }
});

module.exports = lessonSchema;   
