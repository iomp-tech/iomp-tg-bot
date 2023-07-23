import mongoose from 'mongoose'

const User = new mongoose.Schema({
	roles: [{ type: String, ref: "Role" }], 

	email: { type: String, unique: true, required: true, }, 
	password: { type: String, default: "" }, 
})

export default mongoose.model('User', User)