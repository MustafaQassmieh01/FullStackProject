import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  registration_id: {type: String, required: true, unique: true},
  username: {type: String, ref: "User", required: true},
  course_code: {type: String,ref: "Course",required: true,},
  status: {type: String, required: true,
        enum: ["pending", "approved", "rejected"],
        default: "pending"}
});
const Registration = mongoose.model("Registration", registrationSchema, "registrations");
export default Registration;

