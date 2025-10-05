# 📚 EduEnroll – Full Stack Course Registration System

A web-based course registration system where students can register for courses and admins manage them, inspired by platforms like KronoX.

---

## ✅ Project Roadmap

### 🧱 PHASE 1: Setup & Base Conversion
**Goal:** Adapt the existing full stack base into the new project structure.

- [x] Copy assets, components, and backend into Vite app
- [x] Rename links, variables, `.env` keys to match project context
- [x] Verify frontend-backend communication (CORS, fetch/axios)
- [x] Remove old/unused logic and code

---

### 🗃️ PHASE 2: Design Database Schema
**Goal:** Define the data structure and relationships.

**Entities:**
- `User` (id, name, email, passwordHash, role: 'student' | 'admin')
- `Course` (id, title, description, teacher, capacity, prerequisites)
- `Registration` (id, studentId, courseId, status: 'pending' | 'approved' | 'rejected')
- *(Optional)* `Teacher` table or just a field in `Course`

**Tasks:**
- [x] Plan ERD (Entity Relationship Diagram)
- [x] Define and create models (with Sequelize or Mongoose)

---

### 👤 PHASE 3: Authentication & Roles
**Goal:** Implement secure login, signup, and user roles.

- [x] Create signup/login API (bcrypt + JWT)
- [x] Middleware for route protection (`auth`, `isAdmin`)
- [x] Store JWT on client-side and handle auto-login
- [ ] Redirect/deny unauthorized routes

---

### 📄 PHASE 4: Student Features
**Goal:** Enable students to interact with courses.

- [x] View all available courses
- [x] Register for courses
- [x] View pending/approved course registrations
- [ ] Course capacity and eligibility logic (if implemented)

---

### 🧑‍💼 PHASE 5: Admin Features
**Goal:** Build the admin dashboard with control functionality.

- [ ] Admin login-protected dashboard
- [ ] View/approve/reject course registrations
- [ ] CRUD operations for courses
- [ ] View statistics (e.g., how many students per course)

---

### 💄 PHASE 6: Frontend Polish
**Goal:** Ensure a responsive and user-friendly experience.

- [x] Make UI responsive (media queries, Tailwind, etc.)
- [x] Add loading and error handling states
- [ ] Confirm navigation and UX flow

---

### 📈 PHASE 7: Grade 5 Enhancements
**Goal:** Meet all top-grade evaluation criteria.

- [ ] Course prerequisites/eligibility system
- [ ] Course seat capacity limit
- [ ] Charts (e.g., with Chart.js for course stats)
- [ ] Teacher bios or course owner info
- [ ] Clean Git history + detailed About page with roles

---

### ☁️ PHASE 8: Deployment
**Goal:** Publish the live application and finalize documentation.

- [ ] Deploy backend + DB (Render, Railway, PlanetScale, etc.)
- [ ] Deploy frontend (Vercel or Netlify)
- [ ] Finalize `.env` for production
- [ ] Complete README with full setup instructions and demo link

---

## 🧑‍🤝‍🧑 Team Info

_Include in About page:_
- Team name
- Member names
- Each member’s focus area (e.g., Frontend, Backend, Auth, UI/UX)

---

## 📂 Repo Documentation

Make sure the GitHub repo includes:
- `README.md` with project overview
- Tech stack list
- Setup instructions
- `.env.example` file
- Folder structure overview
- Contribution log / commit messages

