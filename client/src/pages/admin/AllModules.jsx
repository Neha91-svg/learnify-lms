import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronDown, Layers, NotebookPen, User } from "lucide-react";

export default function AllModules() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCourse, setOpenCourse] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadModules = async () => {
      try {
        const res = await api.get("/admin/modules");
        setCourses(res.data.courses);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    loadModules();
  }, []);

  if (loading)
    return (
      <div className="ml-64 flex justify-center items-center h-screen">
        <p className="text-lg font-medium animate-pulse">Loading modules...</p>
      </div>
    );

  return (
    <div className="ml-64 p-10 min-h-screen bg-linear-to-br from-pink-100 via-purple-100 to-indigo-100">

      {/* Title */}
      <h1 className="text-5xl font-extrabold text-purple-700 mb-14 drop-shadow-sm">
        📚 All Modules
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {courses.map((course) => (
          <div
            key={course._id}
            onClick={() =>
              setOpenCourse(openCourse === course._id ? null : course._id)
            }
            className="
              backdrop-blur-xl bg-white/50 border border-white/40 
              p-6 rounded-3xl shadow-lg hover:shadow-2xl 
              transition-all hover:scale-[1.03] cursor-pointer
            "
          >
            {/* COURSE HEADER (Same as AllCourses.jsx) */}
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-200 p-3 rounded-xl shadow-md">
                <BookOpen size={26} className="text-purple-700" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-purple-800">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.subtitle || "Course Details"}</p>
              </div>
            </div>

            {/* INSTRUCTOR INFO (Same styling) */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-linear-to-br from-indigo-300 to-purple-300 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md">
                {course.instructor?.name?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{course.instructor?.name}</p>
                <p className="text-sm text-gray-600">{course.instructor?.email}</p>
              </div>
            </div>

            {/* TOGGLE ICON */}
            <div className="flex justify-end">
              <ChevronDown
                size={28}
                className={`text-purple-700 transition-all duration-300 ${
                  openCourse === course._id ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* MODULE SECTION */}
            <div
              className={`transition-all overflow-hidden duration-500 
                ${openCourse === course._id ? "max-h-[2000px] mt-4" : "max-h-0"}`}
            >
              {course.modules.length === 0 ? (
                <p className="text-gray-500 text-sm mt-3">
                  No modules available.
                </p>
              ) : (
                <div className="space-y-5 mt-5">

                  {course.modules.map((mod, index) => (
                    <div
                      key={mod._id}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/lessons/${mod._id}`);
                      }}
                      className="
                        p-5 rounded-xl bg-white shadow-sm border
                        hover:bg-purple-50 hover:shadow-md 
                        transition-all duration-200 cursor-pointer
                        flex flex-col gap-2
                      "
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="text-purple-700" size={20} />
                        <h3 className="text-lg font-semibold text-gray-800">
                          Module {index + 1}: {mod.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 text-sm">{mod.description}</p>

                      {mod.lessons?.length > 0 && (
                        <div className="mt-2">
                          <h4 className="font-medium text-sm text-purple-700 flex items-center gap-1">
                            <NotebookPen size={16} /> Lessons:
                          </h4>

                          <ul className="mt-2 space-y-2">
                            {mod.lessons.map((lsn) => (
                              <li
                                key={lsn._id}
                                className="
                                  flex items-center gap-2 bg-purple-100 
                                  text-purple-800 px-3 py-1 rounded-xl 
                                  shadow-sm text-sm
                                "
                              >
                                <BookOpen size={16} /> {lsn.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}

                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
