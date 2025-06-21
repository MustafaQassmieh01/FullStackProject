import mongoose from "mongoose";

const prerequisitesSchema = new mongoose.Schema({
    course_code: {type:String, ref: "Course", required: true},
    prerequisite_code: {type:String, ref: "Course", required: true},
    additional: { type: String, required: false }
});

const Prerequisite = mongoose.model("Prerequisite", prerequisitesSchema,"prerequisites");
export default Prerequisite;
