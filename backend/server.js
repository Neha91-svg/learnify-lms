const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

/* -------- CORS (SIMPLE) -------- */
app.use(cors());

/* -------- BODY PARSERS -------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------- STATIC FILES -------- */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* -------- ROUTES -------- */
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const courseRoutes = require("./routes/courseRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const instructorLessonRoutes = require("./routes/instrctorLessonRoutes");
const adminSettingsRoutes = require("./routes/adminSettingsRoutes");
const studentRoutes = require("./routes/studentRoutes");

/* -------- HEALTH -------- */
app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

/* -------- API -------- */
app.use("/auth", authRoutes);
app.use("/", userRoutes);
app.use("/instructor", instructorRoutes);
app.use("/instructor", instructorLessonRoutes);
app.use("/admin", adminRoutes);
app.use("/courses", courseRoutes);
app.use("/lesson", lessonRoutes);
app.use("/admin/settings", adminSettingsRoutes);
app.use("/student", studentRoutes);

/* -------- SERVER -------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on PORT ${PORT}`)
);
