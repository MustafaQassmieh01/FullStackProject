/**
 * code: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacher_id: { type:String, required: true },
    capacity: { type: Number, required: true },
 */
import Course from "../models/course.js";
import { handleMongooseError } from "../../utils/errorHandler.js";
const CourseController = {

    /**
     * Creates a new course.
     * @param {Object} req - The request object containing course details - {code, title, description, teacher_id, capacity}.
     * @param {Object} res - The response object to send the result.
     */
    createCourse: async (req, res) => {
        try {
            const { code,
                title,
                description = "",
                teacher_id,
                capacity } = req.body;

            // Validate required fields
            if (!code || !title || !teacher_id || !capacity) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            const newCourse = new Course({
                code,
                title,
                description,
                teacher_id,
                capacity
            });

            await newCourse.save();
            return res.status(201).json({
                success: true,
                message: "Course created successfully",
                data: newCourse
            });
        } catch (error) {
            return handleMongooseError(error, res);
        }
    },

    /**
     * Fetches all courses.
     * @param {Object} req - not used.
     * @param {Object} res - The response object to send the result.
     */
    getAllCourses: async (req, res) => {
        try {
            const courses = await Course.find();
            return res.status(200).json({
                success: true,
                data: courses
            });
        } catch (error) {
            return handleMongooseError(error, res);
        }
    },

    /**
     * changes the capacity of a course.
     * @param {Object} req - The request object containing course code and new capacity.
     * @param {Object} res - The response object to send the result.
     */
    updateCourseCapacity: async (req, res) => {
        try {
            const { code } = req.params;
            const { capacity } = req.body;

            // Validate required fields
            if (!capacity) {
                return res.status(400).json({
                    success: false,
                    message: "Capacity is required"
                });
            }

            const course = await Course.findOneAndUpdate(
                { code },
                { capacity },
                { new: true }
            );

            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Course capacity updated successfully",
                data: course
            });
        } catch (error) {
            return handleMongooseError(error, res);
        }
    }
};

export default CourseController;