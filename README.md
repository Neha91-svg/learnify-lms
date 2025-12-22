# Learnify-lms

**Learnify-lms** is a modern, full-featured **Learning Management System (LMS)** built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
It enables Admins, Instructors, and Students to manage, create, and participate in courses efficiently.

## 🚀 Project Overview

Learnify-LMS provides a role-based platform for managing online courses:

- **Admin**: Full control over the platform, user management, course approval, analytics.  
- **Instructor**: Create, manage, and submit courses for approval.  
- **Student**: Enroll in approved courses, track progress, and access learning content.

This project is designed to demonstrate **full-stack MERN development skills**, including **authentication, authorization, RESTful APIs, and database management**.

---

## 📌 Features

### Admin
- Manage all users (Admin, Instructor, Student)
- Approve or reject instructor-created courses
- Monitor system analytics and reports

### Instructor
- Create, edit, and manage courses
- Submit courses for admin approval

### Student
- Browse and enroll in courses
- Access lessons and course materials

---

## 💻 Tech Stack

| Layer        | Technology |
|-------------|------------|
| Frontend    | React.js, Tailwind CSS |
| Backend     | Node.js, Express.js |
| Database    | MongoDB Atlas |
| Authentication | JWT (JSON Web Tokens) |
| Others      | Axios (API calls), dotenv (Environment variables) |



1. Clone the repository
git clone https://github.com/username/learnify-lms.git
cd learnify-lms

2. Install backend
cd backend
npm install

3. Setup environment variables
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

4. Run backend
npm run dev

5. Install frontend
cd ../client
npm install

6. Run frontend
npm start






