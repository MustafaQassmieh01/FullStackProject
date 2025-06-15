import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 30, 
        match: /^[a-zA-Z0-9_]+$/ // Alphanumeric + underscores
    },
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Basic email regex
    },
    password_hash: { type: String, required: true },
    admin: { 
        type: Boolean, 
        default: false,
        description: "Indicates if the user is an admin"
    },
});

const User = mongoose.model("User", userSchema,"users");
export default User;
