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
# 📚 EduEnroll – Full Stack Course Registration System

A web-based course registration system where students can register for courses and admins manage them, inspired by platforms like KronoX.

---

## ✅ Project Roadmap (current)

This file documents high-level milestones and the current progress so the team can quickly see what's done and what's next.

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
- [x] Define and create models (with Mongoose)

---

### 👤 PHASE 3: Authentication & Roles
**Goal:** Implement secure login, signup, and user roles.

- [x] Create signup/login API (bcrypt + JWT)
- [x] Middleware for route protection (`auth`, `isAdmin`)
- [x] Store JWT on client-side and handle auto-login
- [x] Redirect/deny unauthorized routes (server + client checks)

---

### 📄 PHASE 4: Student Features
**Goal:** Enable students to interact with courses.

- [x] View all available courses
- [x] Register for courses
- [x] View pending/approved course registrations
- [ ] Course capacity and eligibility logic (server & client)

---

### 🧑‍💼 PHASE 5: Admin Features
**Goal:** Build the admin dashboard with control functionality.

- [x] Admin login-protected dashboard (initial)
- [x] View/approve/reject course registrations (basic)
- [x] CRUD operations for courses (create/edit/delete + capacity update)
- [x] View key statistics on dashboard (users/courses/registrations widgets)
- [ ] Finalize Reports and CSV exports

---

### 💄 PHASE 6: Frontend Polish
**Goal:** Ensure a responsive and user-friendly experience.

- [x] Make UI responsive (Tailwind)
- [x] Add loading and error handling states
- [x] Improve admin UX: confirmation modals, spinners, forms
- [ ] Add toasts and consistent notification system

---

### 📈 PHASE 7: Grade 5 Enhancements
**Goal:** Meet all top-grade evaluation criteria.

- [ ] Course prerequisites/eligibility system
- [ ] Course seat capacity limit enforcement (end-to-end)
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

## 🔍 Current status (dev branch)

- Build: ✅ client builds successfully with Vite
- Lint: ⚠️ single non-blocking warning in `authProvider.jsx`
- Admin UI: ✅ dashboard widgets, course CRUD, registrations admin, calendar, news
- API layer: ✅ normalized helpers returning `data` or throwing on error
- CSS: ✅ fixed `FrontPage.css` stray markers

## 🚀 Merge readiness checklist

Before merging `dev` → `master`, run these locally and in CI:

1. git fetch && git checkout dev && git pull origin dev
2. Run client build and lint:

```powershell
cd eduenroll/client
npm ci
npm run lint
npm run build
```

3. Run server smoke tests (if available) or start a dev server and exercise admin flows:

```powershell
cd eduenroll/server
npm ci
# npm test (if tests present) or start server and run manual checks
```

4. Open a PR from `dev` → `master` (recommended). Add reviewers and CI checks. Merge after CI passes.

5. After merge, tag the release if appropriate and deploy to staging.

## 🛠️ Immediate next tasks

- Add toast/notification system and replace transient `message` states in admin pages
- Add pagination/filtering for courses and registrations (client + optional server support)
- Add integration tests or simple smoke scripts for admin flows
- Harden route protection and add tests for admin-only middleware

---

## 🧑‍🤝‍🧑 Team Info

_Include in About page:_
- Team name
- Member names and areas of responsibility (Frontend, Backend, QA)

---

## 📂 Repo Documentation (quick sanity)

Ensure repo contains:
- `README.md` (overview + run instructions)
- `ADMIN_NEXT_STEPS.md` (this file)
- `.env.example`
- Folder structure overview

