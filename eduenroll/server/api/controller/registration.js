/**
 * Controller for handling registration-related operations.
 * This module provides functions to create a new registration, fetch all registrations,
 * edit a registration, change status, and delete a registration.
 * @module RegistrationController
 * @methods { createRegistration,
 getAllRegistrations,
 getUserRegistrations,
 getCourseRegistrations,
 editRegistration,
 changeStatus,
 deleteRegistration}
 */

import Registration from "../models/registration.js";
import { handleMongooseError } from "../../utils/errorHandler.js";

const RegistrationController = {

    /**
     * Creates a new registration.
     * @param {Object} req - The request object containing registration details -  {user_id, course_code, status}.
     * @param {Object} res - The response object to send the result.
     */
    createRegistration: async (req, res) => {
        try {
            const { username, course_code, status } = req.body;
            const count = await Registration.countDocuments();
            const registration_id = `reg_${course_code}-${count + 1}`; // Generate a unique registration ID
            // Validate required fields
            if (!registration_id || !username|| !course_code) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            const newRegistration = new Registration({
                registration_id,
                user_id,
                course_code,
                status
            });

            await newRegistration.save();
            return res.status(201).json({
                success: true,
                message: "Registration created successfully",
                data: newRegistration
            });
        } catch (error) {
            return handleMongooseError(error, res);
        }
    },

    /**
     * Fetches all registrations.
     * @param {Object} req - not used.
     * @param {Object} res - The response object to send the result.
     */
    getAllRegistrations: async (req, res) => {
        try {
            const registrations = await Registration.find();
            return res.status(200).json({
                success: true,
                data: registrations
            });
        } catch (error) {
            return handleMongooseError(error, res);
        }
    },

    /**
     * Fetches registrations for a specific user.
     * @param {Object} req - The request object containing user ID.
     * @param {Object} res - The response object to send the result.
     */
    getUserRegistrations: async (req, res) => {
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({
                    success: false,
                    message: "User ID is required"
                });
            }

            const registrations = await Registration.find({ user_id: userId });
            if (registrations.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No registrations found for this user"
                });
            }

            return res.status(200).json({
                success: true,
                data: registrations
            });
        } catch (error) {
            return handleMongooseError(error, res);
        }
    },

    /**
     * Fetches all registrations for a specific course.
     * @param {String} req - the request object containing course code
     * @param {JSON} res - tkhe response object to send all registrations for the course
     */
    getCourseRegistrations: async (req, res) => {
        try {
            const { courseCode } = req.params;

            if (!courseCode) {
                return res.status(400).json({
                    success: false,
                    message: "Course code is required"
                });
            }

            const registrations = await Registration.find({ course_code: courseCode });
            if (registrations.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No registrations found for this course"
                });
            }

            return res.status(200).json({
                success: true,
                data: registrations
            });
        } catch (error) {
            return handleMongooseError(error, res);
        }
    },

    /**
     * Edits a registration by ID.
     * @param {Object} req - The request object containing registration ID and updated details.
     * @param {Object} res - The response object to send the result.
     */
    editRegistration: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;
            const updatedRegistration = await Registration.findByIdAndUpdate(id, updates, { new: true });
            
            if (!updatedRegistration) {
                return res.status(404).json({
                    success: false,
                    message: "Registration not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Registration updated successfully",
                data: updatedRegistration
            });
        } catch (error) {
            return handleMongooseError(error, res);
        }
    },

    /**
     * Changes the status of a registration.
     * @param {Object} req - The request object containing registration ID and new status.
     * @param {Object} res - The response object to send the result.
     */
    changeStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status || !["pending", "approved", "rejected"].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid status"
                });
            }

            const updatedRegistration = await Registration.findByIdAndUpdate(id, { status }, { new: true });
            if (!updatedRegistration) {
                return res.status(404).json({
                    success: false,
                    message: "Registration not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Status updated successfully",
                data: updatedRegistration
            });
        } catch (error) {
            return handleMongooseError(error, res);
        }
    },

    /**
     * Deletes a registration by ID.
     * @param {Object} req - The request object containing registration ID.
     * @param {Object} res - The response object to send the result.
     * this should be used by the user (will keep it for both it might be used by admin or user)
     * @returns {Object} - The response object containing the result of the deletion.
     */
    deleteRegistration: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedRegistration = await Registration.findByIdAndDelete(id);
            if (!deletedRegistration) {
                return res.status(404).json({
                    success: false,
                    message: "Registration not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Registration deleted successfully"
            });
        } catch (error) {
            return handleMongooseError(error, res);
        }
    }
};

export default RegistrationController;