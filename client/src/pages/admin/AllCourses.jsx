import { useEffect, useState } from "react";
import api from "../../utils/api";
import { BookOpen } from "lucide-react";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // For button loading

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/admin/courses");
        setCourses(res.data);
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleStatusChange = async (courseId, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this course?`)) return;

    setLoadingId(courseId);
    try {
      const res = await api.put(`/admin/courses/${courseId}/status`, { status });
      setCourses(prev =>
        prev.map(course =>
          course._id === courseId ? { ...course, status: res.data.course.status } : course
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update course status");
    }
    setLoadingId(null);
  };

  return (
    <div className="ml-64 p-8 min-h-screen bg-linear-to-br from-pink-100 via-purple-100 to-indigo-100">
      <h2 className="text-4xl font-extrabold text-purple-700 mb-10 drop-shadow-sm">
        All Courses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <div
            key={course._id}
            className="
              backdrop-blur-xl bg-white/50 border border-white/40 
              p-6 rounded-3xl shadow-lg hover:shadow-2xl 
              transition-all hover:scale-[1.03]
            "
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-200 p-3 rounded-xl">
                <BookOpen size={26} className="text-purple-700" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-800">{course.title}</h3>
                <p className="text-sm text-gray-600">Course #{index + 1}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-linear-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md">
                {course.instructor?.name?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{course.instructor?.name}</p>
                <p className="text-sm text-gray-600">{course.instructor?.email}</p>
              </div>
            </div>

            {/* STATUS & ACTION BUTTONS */}
            <div className="flex items-center justify-between mt-4">
              <span
                className={`
                  px-4 py-1 rounded-full text-sm font-semibold 
                  ${
                    course.status === "approved"
                      ? "bg-green-200 text-green-700"
                      : course.status === "rejected"
                      ? "bg-red-200 text-red-700"
                      : "bg-yellow-200 text-yellow-700"
                  }
                `}
              >
                {course.status.toUpperCase()}
              </span>

              {course.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(course._id, "approved")}
                    disabled={loadingId === course._id}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                  >
                    {loadingId === course._id ? "Processing..." : "Approve"}
                  </button>
                  <button
                    onClick={() => handleStatusChange(course._id, "rejected")}
                    disabled={loadingId === course._id}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    {loadingId === course._id ? "Processing..." : "Reject"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
