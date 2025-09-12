/**
 * User Controller
 * This module handles user-related operations such as creating users, fetching user details, and updating user information.
 * @module UserController
 * @requires express
 */

import User from "../models/user.js";
import { handleMongooseError } from "../../utils/errorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tokenControl from "./auth.js";


const UserController = {

    /** 
     * Creates a new user in the database.
     * @param {Object} req - The request object containing user details.
     * @param {Object} res - The response object to send the result.
     */
    createUser: async (req, res) => {
        try {
            const {username,
                name,
                email,
                password,
                admin=false} = req.body;
            // Validate required fields
            if (!username ||  !name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            // Check if user already exists
            const existtingUserEmail = await User.findOne({email});
            const existtingUserName = await User.findOne({username});
            if (existtingUserEmail) {
                return res.status(409).json({
                    success: false,
                    message: 'User already exists with this email',
                });
            }
            if (existtingUserName) {
                return res.status(409).json({
                    success: false,
                    message: 'Username already exists',
                });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = new User({
                username,
                name,
                email,
                password_hash: hashedPassword,
                admin: admin
            });
            await newUser.save();
            // for testing purposes remove this line in production


            const userResponse = newUser.toObject();
            delete userResponse.hashed_password; // Remove sensitive data

            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: userResponse
            });
        }catch (error) {
            handleMongooseError(error, res);
        }
    },

    /**
     * Get all users from the database.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object to send the result.
     */
    getAllUsers: async (req, res) => {
        try{
            const users = await User.find({}, {hashed_password:0}); // Exclude hashed_password from the response
            res.status(200).json({
                success: true,
                data: users
            });
        }catch (error) {
            handleMongooseError(error, res);
        }
    },

    /**
     * Get a user by ID.
     * @param {Object} req - The request object containing the user ID.
     * @param {Object} res - The response object to send the result.
     */
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId, {hashed_password: 0}); // Exclude hashed_password from the response
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            handleMongooseError(error, res);
        }
    },

    /**
     * Update a user by username
     * @param {Object} req - The request object containing the user ID and updated data.
     * @param {Object} res - The response object to send the result.
     */
    updateUser: async (req, res) => {
        try{
            const { username } = req.params;
            const updates = req.body;
            if (updates.password || updates.username){
                return res.status(403).json({
                    success: false,
                    message: "Password and username cannot be updated via this endpoint"
                });
            }
            const updatedUser = await User.findByIdAndUpdate({username:username}, updates,{new:true, runValidators: true});
            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            res.status(200).json({
                success: true,
                data: updatedUser
            });

        }catch (error) {
            handleMongooseError(error, res);
        }
    },

    /**
     * Delete a user by ID.
     * @param {Object} req - The request object containing the user ID.
     * @param {Object} res - The response object to send the result.
     */
    deleteUser: async (req, res) => {
        try{
            const username = req.params.username;
            const deletedUser = await User.findOneAndDelete({username: username});
            if (!deletedUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });
        }catch (error) {
            handleMongooseError(error, res);
        }
    },

    /** 
     *Authenticate a user by username and password.
     * @param {Object} req - The request object containing username and password.
     * @param {Object} res - The response object to send the result. 
    */
   login: async(req, res) => {
        try{
            const{ username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Username and password are required"
                });
            }
            const user = await User.findOne({username});

            if(!user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found"
                });
            }
            const isMatch = await bcrypt.compare(password, user.password_hash);
        
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid password"
                }); 
            }
            const userCard = {
                username: user.username,
                name: user.name,
                email: user.email,
                admin: user.admin
            };
            const Access =tokenControl.generateAccessToken(userCard)
            const refresh = tokenControl.generateRefreshToken(userCard);
            const userResponse = user.toObject();
            delete userResponse.password_hash; // Remove sensitive data
            res.cookie("refreshToken", refresh, {
                httpOnly: true,
                secure: true, // Use secure cookies in production
                sameSite: 'strict', // Prevent CSRF attacks
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                path: '/' // Set path to restrict cookie to this endpoint
            }).status(200).json({
                success: true,
                message: "Login successful",
                data: userResponse,
                accessToken: Access
            });
        }catch (error) {
            handleMongooseError(error, res);
        }
    },
    changePassword: async (req, res) => {
        try {
            const username = req.user.username;
            const { oldPassword, newPassword } = req.body;
            
            console.log("Changing password for user:", username);
            console.log(req.body)
            if (!username || !oldPassword || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid old password"
                });
            }
            user.password_hash = await bcrypt.hash(newPassword, 10);
            const userCard = {
                username: user.username,
                name: user.name,
                email: user.email,
                admin: user.admin
            };

            await user.save();
            const Access =tokenControl.generateAccessToken(userCard)
            const refresh = tokenControl.generateRefreshToken(userCard);
            const userResponse = user.toObject();
            delete userResponse.password_hash; // Remove sensitive data
            res.cookie("refreshToken", refresh, {
                httpOnly: true,
                secure: true, // Use secure cookies in production
                sameSite: 'strict', // Prevent CSRF attacks
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                path: '/api' // Set path to restrict cookie to this endpoint
            }).status(200).json({
                success: true,
                message: "Password changed successfully",
                data: userResponse,
                accessToken: Access
            });
        } catch (error) {
            handleMongooseError(error, res);
        }
    }

};

export default UserController;
