import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacher_id: { type:String, required: true },
    capacity: { type: Number, required: true },
});


const Course = mongoose.model("Course", courseSchema, "courses");
export default Course;