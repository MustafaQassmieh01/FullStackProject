import express from 'express';
import Controller from '../controller/index.js';
import tokenControl from '../controller/auth.js';

const router = express.Router();

// User Routes
router.post('/users', Controller.createUser); // Public - sign up
router.post('/users/login', Controller.loginUser); // Public - login
router.get('/users', tokenControl.authenticate(true), Controller.getAllUsers); // Admin only
router.get('/users/:id', tokenControl.authenticate(), Controller.getUserById); // Authenticated
router.put('/users/:id', tokenControl.authenticate(), Controller.updateUser); // Authenticated
router.delete('/users/:id', tokenControl.authenticate(true), Controller.deleteUser); // Admin only

// Course Routes
router.post('/courses', tokenControl.authenticate(true), Controller.createCourse); // Admin only
router.get('/courses', tokenControl.authenticate(), Controller.getAllCourses); // Authenticated
router.get('/courses/:code', tokenControl.authenticate(), Controller.getCourseByCode); // Authenticated
router.put('/courses/:id/capacity', tokenControl.authenticate(true), Controller.updateCourseCapacity); // Admin only

// Registration Routes
router.post('/registrations/:courseCode', tokenControl.authenticate(), Controller.registerForCourse); // Authenticated
router.post('/registrations/admin', tokenControl.authenticate(true), Controller.createRegistration); // Admin only
router.get('/registrations', tokenControl.authenticate(true), Controller.getAllRegistrations); // Admin only
router.get('/registrations/user', tokenControl.authenticate(), Controller.getUserRegistrations); // Authenticated
// i just figured out that with this being used by the client, they will likely be able to access other users' registrations
// so we need to ensure that the user can only access their own registrations
router.get('/registrations/admin/:username', tokenControl.authenticate(true), Controller.getUserRegistrationsAdmin); // Authenticated
router.get('/registrations/course/:courseCode', tokenControl.authenticate(true), Controller.getCourseRegistrations); // Admin only
router.put('/registrations/:id', tokenControl.authenticate(), Controller.editRegistration); // Authenticated
router.patch('/registrations/:id/status', tokenControl.authenticate(true), Controller.changeStatus); // Admin only
router.delete('/registrations/:id', tokenControl.authenticate(), Controller.deleteRegistration); // Authenticated

// Prerequisite Routes
router.post('/prerequisites', tokenControl.authenticate(true), Controller.createPrerequisite); // Admin only
router.get('/prerequisites', tokenControl.authenticate(), Controller.getAllPrerequisites); // Authenticated
router.get('/prerequisites/course/:courseId', tokenControl.authenticate(), Controller.getCoursePrerequisites); // Authenticated
router.put('/prerequisites/:id', tokenControl.authenticate(true), Controller.editPrerequisite); // Admin only
router.delete('/prerequisites/:id', tokenControl.authenticate(true), Controller.deletePrerequisite); // Admin only

// Token Refresh
router.post('/token/refresh', tokenControl.refreshAccessToken); // Public - must provide valid refresh token

export default router;