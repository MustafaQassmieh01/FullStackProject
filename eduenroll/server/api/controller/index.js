import CourseController from "./course.js";
import RegistrationController from "./registration.js";
import PrerequisiteController from "./prerequisite.js";
import UserController from "./user.js";

const Controller = {
    createCourse: CourseController.createCourse,
    getAllCourses: CourseController.getAllCourses,
    updateCourseCapacity: CourseController.updateCourseCapacity,
    createRegistration: RegistrationController.createRegistration,
    getAllRegistrations: RegistrationController.getAllRegistrations,
    getUserRegistrations: RegistrationController.getUserRegistrations,
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
    deleteUser: UserController.deleteUser
}
export default Controller;