import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useTheme } from "../../context/ThemeContext";

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const { theme, toggleTheme } = useTheme();

  const loadCourses = async () => {
    try {
      const res = await api.get("/instructor/dashboard");
      setCourses(res.data.courses || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // DELETE COURSE
  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await api.delete(`/instructor/course/${id}/delete`);
      loadCourses(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to delete!");
    }
  };

  return (
    <div
      className={`min-h-screen px-8 transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-linear-to-br from-pink-100 via-purple-100 to-sky-100 text-gray-800"
      }`}
    >
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-10">
        <h1
          className={`text-3xl font-extrabold tracking-tight drop-shadow-sm ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Instructor Dashboard
        </h1>

        {/* Create Course */}
        <button
          onClick={() => navigate("/instructor/create-course")}
          className={`px-5 py-2.5 rounded-xl shadow-md font-semibold transition-all hover:scale-105 ${
            theme === "dark"
              ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
              : "bg-white/30 backdrop-blur-md text-gray-700"
          }`}
        >
          + Create Course
        </button>
      </div>

      {/* COURSE GRID */}
      {courses.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className={`flex flex-col rounded-2xl overflow-hidden shadow-md transition-all duration-300 border ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-200 border-gray-700 hover:scale-105 hover:shadow-lg"
                  : "bg-white/30 text-gray-800 border-white/20 hover:scale-105 hover:shadow-lg"
              }`}
            >
              {/* IMAGE */}
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
              )}

              <div className="p-5 flex flex-col grow">
                {/* TITLE */}
                <h3 className="text-xl font-bold mb-1">{course.title}</h3>

                {/* PRICE */}
                <p
                  className={`text-sm mb-3 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <span className="font-semibold text-green-500">
                    ₹{course.price || 0}
                  </span>
                </p>

                {/* DESCRIPTION */}
                <p
                  className={`text-sm mb-4 line-clamp-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {course.description}
                </p>

                {/* SPACER */}
                <div className="grow"></div>

                {/* ACTIONS */}
                <div className="flex gap-3 mt-4">
                  {/* MANAGE */}
                  <button
                    onClick={() =>
                      navigate(`/instructor/course/${course._id}/details`)
                    }
                    className={`w-full py-2 font-semibold rounded-xl shadow-md transition ${
                      theme === "dark"
                        ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                        : "bg-white/30 backdrop-blur-md text-gray-700 hover:scale-105"
                    }`}
                  >
                    Manage
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteCourse(course._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition shadow-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p
          className={`text-center text-lg opacity-80 mt-20 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          No courses created yet.
        </p>
      )}
    </div>
  );
}
