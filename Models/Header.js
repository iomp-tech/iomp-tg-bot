import mongoose from 'mongoose'

const Header = new mongoose.Schema({
	courseTitle: { type: String, default: "" },
	timetableTitle: { type: String, default: "" },
})

export default mongoose.model("Header", Header)