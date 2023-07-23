import mongoose from 'mongoose'

const FooterPolicy = new mongoose.Schema({
	text: { type: String, default: "" },
	images: [{ type: String, default: "" }],
})

export default mongoose.model("FooterPolicy", FooterPolicy)