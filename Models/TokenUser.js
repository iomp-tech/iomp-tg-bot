import mongoose from 'mongoose'

const TokenUser = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
	refreshToken: { type: String, required: true }
})

export default mongoose.model('TokenUser', TokenUser)