import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    loadCourses();
    loadMyCourses();
  }, []);

  const loadCourses = async () => {
    const res = await api.get("/courses/all");
    setCourses(res.data);
  };

  const loadMyCourses = async () => {
    const res = await api.get("/my-courses");
    setMyCourses(res.data.map((c) => c._id));
  };

  const isEnrolled = (id) => myCourses.includes(id);

  const enrollCourse = async (courseId) => {
    try {
      await api.post(`/courses/${courseId}/enroll`);
      setMyCourses((prev) => [...prev, courseId]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-800">
      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-8 py-10">
        <h1 className="text-3xl font-extrabold mb-10 tracking-tight text-gray-800 drop-shadow-sm">
          Explore Courses
        </h1>

        {courses.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
            {courses.map((course) => (
              <div
                key={course._id}
                className="flex flex-col rounded-2xl overflow-hidden shadow-md border border-gray-200 
                  bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* CONTENT */}
                <div
                  className="p-5 flex flex-col grow cursor-pointer"

                >
                  <h3 className="text-xl font-bold text-black">{course.title}</h3>
                  <p className="text-sm text-gray-700 mt-1">{course.category}</p>
                  <p className="text-lg font-semibold text-black mt-2">
                    ₹{course.price}
                  </p>

                  {/* SPACER */}
                  <div className="grow"></div>

                  {/* BUTTON */}
                  <div className="mt-4">
                    {isEnrolled(course._id) ? (
                      <button
                        onClick={() => navigate("/student/my-courses")}
                        className="w-full py-2 rounded-xl font-semibold bg-green-600 text-white hover:bg-green-700 transition"
                      >
                        Already Enrolled
                      </button>
                    ) : (
                      <button
                        onClick={() => enrollCourse(course._id)}
                        className="w-full py-2 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg opacity-80 mt-20 text-gray-700">
            No courses available right now.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
