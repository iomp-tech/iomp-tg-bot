import mongoose from 'mongoose'

const Course = new mongoose.Schema({
	price: { type: String, default: "" },

	image: { type: String, default: "" },

	videoUrl: { type: String, default: "" },

	category: { type: String, default: "" },
	title: { type: String, default: "" },
	description: { type: String, default: "" },
	master: { type: String, default: "" },
	btnText: { type: String, default: "" },

	programm: {
		title: { type: String, default: "" },
		description: { type: String, default: "" },

		items: [{ subtitle: { type: String, default: "" }, title: { type: String, default: "" }, description: { type: String, default: "" } }]
	},

	formTitle: { type: String, default: "" },

	thankPageTitle: { type: String, default: "" },
	thankPageDescription: { type: String, default: "" },

	isDemo: { type: Boolean, default: false },
	priceDemo: { type: String, default: "" },

	imageDemo: { type: String, default: "" },
	categoryDemo: { type: String, default: "" },
	titleDemo: { type: String, default: "" },
	btnTextDemo: { type: String, default: "" },
	descriptionDemo: { type: String, default: "" },
	masterDemo: { type: String, default: "" },
	idAwoDemo: { type: Number, default: "" },

	isHidden: { type: Boolean, default: false },

	thankPageTitleDemo: { type: String, default: "" },
	thankPageDescriptionDemo: { type: String, default: "" },

	idAwo: { type: Number, default: "" },
})

Course.index({ title: 'text', description: 'text', tags: 'text' })

export default mongoose.model("Course", Course)