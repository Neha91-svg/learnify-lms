import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import LessonPlayer from "../../components/LessonPlayer"; // 👈 Import LessonPlayer

export default function ManageCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load course + modules
  const loadCourse = async () => {
    try {
      const res = await api.get(`/instructor/course/${courseId}/full`);
      setCourse(res.data.course);
      setModules(res.data.modules);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  // DELETE MODULE
  const deleteModule = async (moduleId) => {
    if (!window.confirm("Delete this module?")) return;

    try {
      await api.delete(`/instructor/course/${courseId}/module/${moduleId}`);
      loadCourse();
    } catch (err) {
      console.error(err);
      alert("Could not delete module");
    }
  };

  // DELETE LESSON
  const deleteLesson = async (moduleId, lessonId) => {
    if (!window.confirm("Delete this lesson?")) return;

    try {
      await api.delete(
        `/instructor/course/${courseId}/module/${moduleId}/lesson/${lessonId}`
      );
      loadCourse();
    } catch (err) {
      alert("Failed to delete lesson");
    }
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* COURSE HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <button
          onClick={() => navigate(`/instructor/course/${courseId}/module/add`)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Add Module
        </button>
      </div>

      {/* COURSE INFO */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-3">Course Information</h2>
        <p className="mb-2"><strong>Price:</strong> ₹{course.price}</p>
        <p className="mb-4 text-gray-700">{course.description}</p>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/instructor/course/${courseId}/edit`)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit Course
          </button>

          <button
            onClick={() => navigate(`/instructor/dashboard`)}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Back
          </button>
        </div>
      </div>

      {/* MODULES & LESSONS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Curriculum</h2>

        {modules.length === 0 ? (
          <p className="text-gray-500">No modules added yet.</p>
        ) : (
          modules.map((module, moduleIndex) => (
            <div key={module._id} className="border rounded-lg p-4 bg-gray-50 mb-5">
              {/* MODULE HEADER */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold">
                  {moduleIndex + 1}. {module.title}
                </h3>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/instructor/course/${courseId}/module/${module._id}/edit`)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteModule(module._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* LESSONS */}
              <h4 className="font-semibold text-gray-600 mb-2">Lessons</h4>

              {module.lessons.length === 0 ? (
                <p className="text-gray-500 text-sm">No lessons yet.</p>
              ) : (
                module.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lesson._id}
                    className="border p-3 rounded bg-white shadow-sm mb-2"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-2 w-full">
                        {/* Lesson Title & Description */}
                        <p className="font-medium">
                          {lessonIndex + 1}. {lesson.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {lesson.description?.slice(0, 60)}...
                        </p>

                        {/* 🔥 LessonPlayer Component */}
                        <LessonPlayer videoUrl={lesson.videoUrl} />
                      </div>

                      <div className="flex flex-col gap-1 ml-3">
                        <button
                          onClick={() =>
                            navigate(
                              `/instructor/course/${courseId}/module/${module._id}/lesson/${lesson._id}/edit`
                            )
                          }
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteLesson(module._id, lesson._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* ADD LESSON */}
              <button
                onClick={() =>
                  navigate(
                    `/instructor/course/${courseId}/module/${module._id}/lesson/add`
                  )
                }
                className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded text-sm"
              >
                + Add Lesson
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
