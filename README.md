# 🎓 EduEnroll – University Course Registration System

**EduEnroll** is a full-stack web application that allows university students to register for courses and enables administrators to manage those registrations, courses, and user roles. Inspired by platforms like KronoX, this app focuses on simplicity, usability, and meeting real-world academic planning needs.

---

## 🚀 Features

### 👩‍🎓 Student Features
- View and register for available courses
- See registration status (pending/approved)
- Browse course information and teacher details
- Personalized course list per user

### 🧑‍💼 Admin Features
- View student registrations and approve/reject them
- Create, edit, or delete courses
- See student statistics per course
- Role-based dashboard with protected access

---

## 🔐 Authentication
- Secure signup and login system (JWT-based)
- Passwords are hashed using bcrypt
- Role-based access control: `student`, `admin`
- Protected routes and UI rendering per user type

---

## 🧱 Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Frontend    | Vite + React             |
| Styling     | Tailwind CSS / CSS       |
| Backend     | Node.js + Express        |
| Database    | PostgreSQL / MySQL       |
| Auth        | JWT + bcrypt             |
| Deployment  | Vercel (frontend), Render or Railway (backend + DB) |

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/MustafaQassmieh01/FullStackProject.git
cd eduenroll
