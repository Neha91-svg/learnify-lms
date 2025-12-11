import StudentSidebar from "./studentSidebar";

const StudentLayout = ({ children }) => {
    return (
        <div className="flex">

            {/* Sidebar */}
            <div className="w-64 h-screen bg-gray-900 text-white p-5">
                <StudentSidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 p-6 bg-gray-100 min-h-screen">
                {children}
            </div>

        </div>
    );
};

export default StudentLayout;
