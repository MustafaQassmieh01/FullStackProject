import CourseController from "./course.js";
import RegistrationController from "./registration.js";
import PrerequisiteController from "./prerequisite.js";
import UserController from "./user.js";

const Controller = {
    createCourse: CourseController.createCourse,
    getAllCourses: CourseController.getAllCourses,
    getCourseByCode: CourseController.getCourseByCode,
    updateCourseCapacity: CourseController.updateCourseCapacity,
    registerForCourse: RegistrationController.registerForCourse,
    createRegistration: RegistrationController.createRegistration,
    getAllRegistrations: RegistrationController.getAllRegistrations,
    getUserRegistrations: RegistrationController.getUserRegistrations,
    getUserRegistrationsAdmin: RegistrationController.getUserRegistrationsAdmin,
    getCourseRegistrations: RegistrationController.getCourseRegistrations,
    editRegistration: RegistrationController.editRegistration,
    changeStatus: RegistrationController.changeStatus,
    deleteRegistration: RegistrationController.deleteRegistration,
    createPrerequisite: PrerequisiteController.createPrerequisite,
    getAllPrerequisites: PrerequisiteController.getAllPrerequisites,  //I do need one specific to course
    getCoursePrerequisites: PrerequisiteController.getCoursePrerequisites,
    editPrerequisite: PrerequisiteController.editPrerequisite,
    deletePrerequisite: PrerequisiteController.deletePrerequisite,
    createUser: UserController.createUser,
    getUserById: UserController.getUserById,
    updateUser: UserController.updateUser,
    deleteUser: UserController.deleteUser,
    loginUser: UserController.login,
    getAllUsers: UserController.getAllUsers

}
export default Controller;