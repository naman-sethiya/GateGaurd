import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
	rollNo: {
		type: Number,
		required: true,
	},
	outDateAndTime:
	{
		type: Date,
		default: Date.now,
		required: true,
	},
	inDateAndTime:
	{
		type: Date,
		default: "",
	},
}, { timestamps: true });

registerSchema.methods.getOutDateTime = () => {
	const date = this.outDateAndTime.toLocaleDateString();
	const time = this.outDateAndTime.toLocaleTimeString();
	return { date, time }
}

registerSchema.methods.getInDateTime = () => {
	const date = this.inDateAndTime.toLocaleDateString()
	const time = this.inDateAndTime.toLocaleTimeString()
    return { date,time }
}

const Register = mongoose.model("Register", registerSchema);
export default Register;