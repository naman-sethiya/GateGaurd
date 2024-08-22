import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,
	},

	rollNo: {
		type: Number,
		required: true,
		unique:true,
		index:true
	},

	department: {
		type: String,
		required: true,
		maxLength: 50,
	},
	
	contact :
	{
		type:Number,
		required:true,
		maxLength:10,
		minLength:10,
	},

	hostel: {
		type: String,
		required: true,
	},
},{timestamps:true});

const Student = mongoose.model("Student", studentSchema);
export default Student ;