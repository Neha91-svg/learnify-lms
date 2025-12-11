import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

// Auth pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Student pages
import Home from "./pages/student/Home";
import MyCourses from "./pages/student/MyCourses";
import Profile from "./pages/student/Profile";
import CourseDetails from "./pages/student/CourseDetails";
import StudentLayout from "./pages/student/StudentLayout";

// Instructor pages
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import CreateCourse from "./pages/instructor/CreateCourse";
import InstructorCourseDetails from "./pages/instructor/InstructorCourseDetails";
import EditCourse from "./pages/instructor/EditCourse";
import AddLesson from "./pages/instructor/AddLesson";
import EditLesson from "./pages/instructor/EditLesson";
import AddModule from "./pages/instructor/AddModule";
import EditModule from "./pages/instructor/EditModule";
import InstructorMyCourses from "./pages/instructor/instructorMyCourses";
import InstructorLayout from "./pages/instructor/InstructorLayout";
import InstructorProfile from "./pages/instructor/InstructorProfile";

// Admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllUsers from "./pages/admin/AllUsers";
import AllStudents from "./pages/admin/Students";
import AllInstructors from "./pages/admin/AllInstructors";
import PendingCourses from "./pages/admin/PendingCourses";
import AllCourses from "./pages/admin/AllCourses";
import ApprovedCourses from "./pages/admin/ApprovedCourses";
import RejectedCourses from "./pages/admin/RejectedCourses";
import AllModules from "./pages/admin/AllModules";
import ModuleLessons from "./pages/admin/ModuleLessons";

import AdminSettings from "./pages/admin/AdminSettings";
import AdminProfile from "./pages/admin/AdminProfile";
import StudentDetails from "./pages/admin/StudentDetails";
import InstructorDetails from "./pages/admin/InstructorDetails";

function App() {
  const { user, loading } = useAuth();

  const PrivateRoute = ({ children, requiredRole }) => {
    if (loading) return <div>Loading...</div>;  // wait until user loads

    if (!user) return <Navigate to="/login" replace />;

    if (requiredRole && user.role !== requiredRole)
      return <Navigate to="/login" replace />;

    return children;
  };

  return (
    <ThemeProvider>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Auto redirect */}
        <Route
          path="/"
          element={
            <Navigate
              to={
                user
                  ? user.role === "student"
                    ? "/student/home"
                    : user.role === "instructor"
                      ? "/instructor/dashboard"
                      : "/admin/dashboard"
                  : "/login"
              }
              replace
            />
          }
        />

        {/* ========= Student ========= */}
        <Route
          path="/student/home"
          element={
            <PrivateRoute requiredRole="student">
              <StudentLayout>
                <Home />
              </StudentLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/student/my-courses"
          element={
            <PrivateRoute requiredRole="student">
              <StudentLayout>
                <MyCourses />
              </StudentLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <PrivateRoute requiredRole="student">
              <StudentLayout>
                <Profile />
              </StudentLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/student/course/:id"
          element={
            <PrivateRoute requiredRole="student">
              <StudentLayout>
                <CourseDetails />
              </StudentLayout>
            </PrivateRoute>
          }
        />

        {/* ========= Instructor ========= */}
        <Route
          path="/instructor/dashboard"
          element={
            <PrivateRoute requiredRole="instructor">
              <InstructorLayout>
                <InstructorDashboard />
              </InstructorLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor/create-course"
          element={
            <PrivateRoute requiredRole="instructor">
              <InstructorLayout>
                <CreateCourse />
              </InstructorLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor/course/:courseId/details"
          element={
            <PrivateRoute requiredRole="instructor">
              <InstructorLayout>
                <InstructorCourseDetails />
              </InstructorLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor/my-courses"
          element={
            <PrivateRoute requiredRole="instructor">
              <InstructorLayout>
                <InstructorMyCourses />
              </InstructorLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor/course/:courseId/edit"
          element={
            <PrivateRoute requiredRole="instructor">
              <InstructorLayout>
                <EditCourse />
              </InstructorLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor/course/:courseId/module/add"
          element={
            <PrivateRoute requiredRole="instructor">
              <InstructorLayout>
                <AddModule />
              </InstructorLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor/course/:courseId/module/:moduleId/edit"
          element={
            <PrivateRoute requiredRole="instructor">
              <InstructorLayout>
                <EditModule />
              </InstructorLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor/course/:courseId/module/:moduleId/lesson/add"
          element={
            <PrivateRoute requiredRole="instructor">
              <InstructorLayout>
                <AddLesson />
              </InstructorLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor/course/:courseId/module/:moduleId/lesson/:lessonId/edit"
          element={
            <PrivateRoute requiredRole="instructor">
              <InstructorLayout>
                <EditLesson />
              </InstructorLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor/profile"
          element={
            <PrivateRoute requiredRole="instructor">
              <InstructorLayout>
                <InstructorProfile />
              </InstructorLayout>
            </PrivateRoute>
          }
        />

        {/* ========= Admin ========= */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout>
                <AllUsers />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout>
                <AllStudents />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/student/:id"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout>
                <StudentDetails />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/instructors"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout>
                <AllInstructors />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout>
                <AllCourses />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/courses/pending"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout>
                <PendingCourses />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/courses/approved"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout>
                <ApprovedCourses />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/courses/rejected"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout>
                <RejectedCourses />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/modules"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout>
                <AllModules />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/lessons/:moduleId"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout>
                <ModuleLessons />
              </AdminLayout>
            </PrivateRoute>
          }
        />


        <Route
          path="/admin/settings"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout>
                <AdminSettings />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout>
                <AdminProfile />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/instructor/:id"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout>
                <InstructorDetails />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
