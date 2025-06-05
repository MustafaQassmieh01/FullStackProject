/**
 * Controller for handling registration-related operations.
 * This module presents the functions to create a new prerequisite, fetch all prerequisites,
 * edit a prerequisite, and delete a prerequisite.
 */

import Prerequisite from "../models/prerequisite.js";
import { handleMongooseError } from "../utils/errorHandler.js";
import Course from "../models/course.js";
const PrerequisiteController = {

    /**
     * Creates a new prerequisite.
     * @param {Object} req - The request object containing prerequisite details - {course_code, prerequisite_course_code}.
     * @param {Object} res - The response object to send the result.
     */
    createPrerequisite: async (req, res) => {
        try {
            const { course_code, prerequisite_course_code } = req.body;

            // Validate required fields
            if (!course_code || !prerequisite_course_code) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            // Check if the course exists
            const course = await Course.findOne({ code: course_code });
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found"
                });
            }

            const newPrerequisite = new Prerequisite({
                course_code,
                prerequisite_course_code
            });

            await newPrerequisite.save();
            return res.status(201).json({
                success: true,
                message: "Prerequisite created successfully",
                data: newPrerequisite
            });
        } catch (error) {
            return handleMongooseError(error, res);
        }
    },

    /**
     * Fetches all prerequisites.
     * @param {Object} req - not used.
     * @param {Object} res - The response object to send the result.
     */
    getAllPrerequisites: async (req, res) => {
        try {
            const prerequisites = await Prerequisite.find();
            return res.status(200).json({
                success: true,
                data: prerequisites
            });
        } catch (error) {
            return handleMongooseError(error, res);
        }
    },

    /**
     * Edits an existing prerequisite.
     * @param {Object} req - The request object containing prerequisite details - {id, course_code, prerequisite_course_code}.
     * @param {Object} res - The response object to send the result.
     */
    editPrerequisite: async (req, res) => {
        try {
            const { id, course_code, prerequisite_course_code } = req.body;

            // Validate required fields
            if (!id || !course_code || !prerequisite_course_code) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }
            // Check if the prerequisite exists
            const prerequisite = await Prerequisite.findById(id);
            if (!prerequisite) {
                return res.status(404).json({
                    success: false,
                    message: "Prerequisite not found"
                });
            }
            // Update the prerequisite
            prerequisite.course_code = course_code;
            prerequisite.prerequisite_course_code = prerequisite_course_code;
            await prerequisite.save();
            return res.status(200).json({
                success: true,
                message: "Prerequisite updated successfully",
                data: prerequisite
            });
        } catch (error) {
            return handleMongooseError(error, res);
        }
    },
    /**
     * Deletes a prerequisite.
     * @param {Object} req - The request object containing the prerequisite ID.
     * @param {Object} res - The response object to send the result.
     */
    deletePrerequisite: async (req, res) => {
        try {
            const { id } = req.params;

            // Validate required fields
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "ID is required"
                });
            }

            // Check if the prerequisite exists
            const prerequisite = await Prerequisite.findById(id);
            if (!prerequisite) {
                return res.status(404).json({
                    success: false,
                    message: "Prerequisite not found"
                });
            }

            // Delete the prerequisite
            await prerequisite.remove();
            return res.status(200).json({
                success: true,
                message: "Prerequisite deleted successfully"
            });
        } catch (error) {
            return handleMongooseError(error, res);
        }
    }
};