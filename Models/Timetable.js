import mongoose from 'mongoose'

const Timetable = new mongoose.Schema({
	category: { type: String, default: "" },
	title: { type: String, default: "" },
	description: { type: String, default: "" },
	image: { type: String, default: "" },
	videoUrl: { type: String, default: "" },

	isAuto: { type: Boolean, default: false },
	prolongationAutoDay: { type: Number, default: 0 },
	date: { type: Date, default: "" },

	formTitle: { type: String, default: "" },

	thankPageTitle: { type: String, default: "" },
	thankPageDescription: { type: String, default: "" },

	isRedirect: { type: Boolean, default: false },
	redirectUrl: { type: String, default: "" },

	isHidden: { type: Boolean, default: false },

	idAwo: { type: Number, default: "" },
})

Timetable.index({ title: 'text', description: 'text', tags: 'text' })

export default mongoose.model("Timetable", Timetable)