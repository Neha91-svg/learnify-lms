import React from "react";
import InstructorSidebar from "./InstructorSidebar";

export default function InstructorLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <InstructorSidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
