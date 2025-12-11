import { useEffect, useState } from "react";
import axios from "axios";

const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const token = localStorage.getItem("token");

    const getCourses = async () => {
        try {
            const res = await axios.get("http://localhost:5000/admin/courses", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCourses(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    const deleteCourse = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/admin/courses/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            getCourses();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Courses</h2>

            {courses.length === 0 ? (
                <p>No courses available.</p>
            ) : (
                courses.map((course) => (
                    <div
                        key={course._id}
                        className="border p-4 rounded mb-3 flex justify-between"
                    >
                        <div>
                            <h3 className="text-xl font-semibold">{course.title}</h3>
                            <p className="text-gray-500">{course.description}</p>
                            <p className="text-sm text-gray-700">
                                Status:{" "}
                                <span className="font-semibold">
                                    {course.isApproved ? "Approved" : "Pending"}
                                </span>
                            </p>
                        </div>

                        <button
                            className="bg-red-600 text-white py-2 px-4 rounded"
                            onClick={() => deleteCourse(course._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default ManageCourses;
