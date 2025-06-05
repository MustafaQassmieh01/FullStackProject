import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 30, 
        match: /^[a-zA-Z0-9_]+$/ // Alphanumeric + underscores
    },
    full_name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Basic email regex
    },
    hashed_password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['student',  'admin'], 
        default: 'student' 
    },
});

const User = mongoose.model("User", userSchema,"users");
export default User;
