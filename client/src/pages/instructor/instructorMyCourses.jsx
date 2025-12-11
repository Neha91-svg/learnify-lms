import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const res = await api.get("/instructor/my-courses");

        // IMPORTANT: populate modules + lessons
        const populatedCourses = await Promise.all(
          res.data.courses.map(async (course) => {
            const courseDetails = await api.get(`/instructor/course/${course._id}`);
            return courseDetails.data;
          })
        );

        setCourses(populatedCourses);
      } catch (err) {
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  if (loading)
    return (
      <p
        className={`p-4 text-center ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Loading...
      </p>
    );

  return (
    <div
      className={`min-h-screen pt-4 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <h2
        className={`text-3xl font-extrabold mb-6 ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        My Courses
      </h2>

      {courses.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {courses.map((course) => (
            <div
              key={course._id}
              onClick={() => navigate(`/instructor/course/${course._id}`)}
              className={`cursor-pointer p-5 rounded-2xl border shadow-md hover:shadow-xl transition-all duration-300
                ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }
              `}
            >
              {/* Title */}
              <h3 className="text-xl font-bold mb-2 line-clamp-2">
                {course.title}
              </h3>

              {/* Modules */}
              <p className="text-sm font-semibold opacity-80 mb-2">
                Modules: {course.modules?.length || 0}
              </p>

              {/* MODULES + LESSONS */}
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {course.modules?.length ? (
                  course.modules.map((module) => (
                    <div key={module._id} className="mb-2">
                      <p className="font-medium text-blue-500">
                        • {module.title}
                      </p>

                      {module.lessons?.length ? (
                        <ul className="list-disc ml-5 text-sm opacity-70">
                          {module.lessons.map((lesson) => (
                            <li key={lesson._id}>{lesson.title}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-gray-400 ml-5">
                          No lessons added
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm opacity-60">No modules available.</p>
                )}
              </div>

              {/* Price + Status */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold text-green-500">
                  ₹{course.price || 0}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    course.status === "approved"
                      ? "bg-green-200 text-green-700"
                      : course.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {course.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p
          className={`text-center text-lg opacity-80 mt-12 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          You haven’t created any courses yet.
        </p>
      )}
    </div>
  );
}
