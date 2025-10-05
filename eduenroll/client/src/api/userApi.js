import { courses } from "./courses";
import { users} from "./users";
import { prerequisites } from "./prerequesites";
import { registrations } from "./registrations";

/**
 * This module provides an API for user-related operations in the EduEnroll application. (Interface)
 * functions include user login, signup, course retrieval, prerequisite checking, and course registration.
 */
export const Api = {
    User: {
        auth: {
            login: users.login,
            signup: users.signup,
            changePassword: users.changePassword
        },
        courses:{
            getAll: courses.getAllCourses,
            getByCode: courses.getCourseByCode,
            getPrerequisites: prerequisites.getPrerequisitesByCourseCode
        },
        registrations:{
            list: registrations.getRegistrationsByUser,
            add: registrations.addRegistration,
            remove: registrations.deleteRegistration
        },
    },
    admin:{
        users:{
            getAll: users.getUsers,
            getById: users.getUserById,
            delete: users.deleteUser
        },
        courses:{
            create: courses.createCourse,
            updateCapacity: courses.updateCourseCapacity,
            delete: courses.deleteCourse
        },
        registrations:{
            getAll: registrations.getAllRegistrations,
            getByUser: registrations.getRegistrationsByUser,
            getByCourse: registrations.getRegistrationsByCourse,
            create: registrations.createRegistration,
            edit: registrations.editRegistration,
            changeStatus: registrations.changeStatus,
        }
    }
    login: (username, password) => users.login(username, password),
    signup: (userData) => users.signup(userData),
    getAllCourses: () => courses.getAllCourses(),
    getCourseByCode: (code) => courses.getCourseByCode(code),
    getCoursePrerequisites: (courseCode) => prerequisites.getPrerequisitesByCourseCode(courseCode),
    getRegistrations: () => registrations.getRegistrationsByUser(),
    register: (courseCode) => registrations.addRegistration(courseCode),
    removeRegistration: (registrationId) => registrations.removeRegistration(registrationId),
    changePassword: (oldPassword, newPassword) => users.changePassword(oldPassword, newPassword)
};

// ==========================================
// 💡 Future Refactor Suggestion:
// ==========================================
/*
 * You might later refactor userApi to be grouped by domain, like this:

export const userApi = {
    auth: {
        login: users.login,
        signup: users.signup,
    },
    courses: {
        getAll: courses.getAllCourses,
        getByCode: courses.getCourseByCode,
        getPrerequisites: prerequisites.getPrerequisitesByCourseCode,
    },
    registrations: {
        list: registrations.getRegistrationsByUser,
        add: registrations.addRegistration,
    }
};

 * Example usage:
import { userApi } from '../api/userApi';
const { auth, courses, registrations } = userApi;
auth.login(username, password);
courses.getAll().then(...);
registrations.list().then(...);
 */
