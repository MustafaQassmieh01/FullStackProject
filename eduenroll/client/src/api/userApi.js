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
            logout: users.logout,
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
};

