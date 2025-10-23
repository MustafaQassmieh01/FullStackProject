# Admin - Next Steps

This file lists the immediate next steps to finish the admin area and how to preview it next time you open the project.

## High level plan

1. Finish the rest of the admin pages and wire them into the admin router.
2. Ensure admins are the only users who can access admin pages and admin API endpoints.


---

## Tasks

- Finish admin pages (UI + API wiring)
  - Users page (list, view, edit, delete)
  - Courses page (create, edit, delete, update capacity)
  - Registrations admin (list, change status, create/delete)
  - Reports (basic stats: totals, trends, export CSV)

- Client-side route protection
  - Add `/admin` route in the router
  - Use `ProtectRoute` or similar that checks `user.admin` (from `useUser()`)
  - Redirect unauthorized users to `/unauthorized` or `/`

- Server-side protection
  - Ensure admin middleware checks `decoded.admin` on protected endpoints
  - Confirm JWTs include `admin` claim at login and refresh

- Navigation & UX
  - Make navigation role-aware (show admin links only when `user.admin`)
  - Add admin-only quick actions in the header (create course, import users)

- Dev preview tips
  - To preview admin locally without login, in DevTools run:
    ```js
    localStorage.setItem('user', JSON.stringify({ username: 'dev', name: 'Dev', admin: true }));
    window.location.reload();
    ```
  - Or temporarily render `AdminDashboard` in `src/main.jsx` while styling.

- Testing & QA
  - Run `npm run dev` in `eduenroll/client`
  - Validate layout and API calls


## Quick Commands

```powershell
cd "c:\Users\windows\Desktop\Active Projects\FullStackProject\eduenroll\client"
npm run dev
```


## Notes

- The backend already returns `admin` in the user object; use `Boolean(user?.admin)` to check admin permissions.
- Prefer server-side enforcement for security (frontend checks are UX only).


---

If you want, I can start implementing items from the tasks list now (pick one):
- "Finish admin pages" — I can scaffold Users/Courses/Registrations pages and wire them to the API.
- "Client-side route protection" — I'll add a protected `/admin` route.
- "Server-side protection" — I'll review middleware and add tests.

Which should I implement first?
