import moment from 'moment';

import ApiError from '../Exceptions/ApiError.js';

import FileService from '../Services/FileService.js'

import Timetable from '../Models/Timetable.js'

class TimetableService {
	async create(timetableData, files) {
		if (!files.image) {
			throw ApiError.BadRequest("Фото не передано")
		}

		const { file } = FileService.saveImage(files.image, "storage/public/uploads/timetables", "uploads/timetables")

		timetableData.image = file

		const timetable = await Timetable.create(timetableData)

		return {
			...timetable.toJSON(),
			id: timetable._id,
			image: `${process.env.IMAGE_DOMEN}/${timetable.image}`
		}
	}

	async update(timetableData, files) {
		const { _id } = timetableData

		const findtimetable = await Timetable.findById(_id)

		if (!findtimetable) {
			throw ApiError.BadRequest("Курс не найден")
		}

		if (files && files.image) {
			FileService.deleteFile(`storage/public/${findtimetable.image}`)

			const { file } = FileService.saveImage(files.image, "storage/public/uploads/timetables", "uploads/timetables")

			timetableData.image = file
		}

		const newtimetable = await Timetable.findByIdAndUpdate(_id, timetableData, { new: true })

		return {
			...newtimetable.toJSON(),
			id: newtimetable._id,
			image: `${process.env.IMAGE_DOMEN}/${newtimetable.image}`
		}
	}

	async delete(id) {
		if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
			throw ApiError.BadRequest('ID не передан')
		}

		const timetableData = await Timetable.findByIdAndDelete(id)

		FileService.deleteFile(`storage/public/${timetableData.image}`)

		return { message: "Курс успешно удален", data: timetableData }
	}

	async getById(id) {
		if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
			throw ApiError.BadRequest('ID не передан')
		}

		const timetable = await Timetable.findOne({ _id: id, isHidden: false })

		if (!timetable) {
			return {}
		}

		return {
			...timetable.toJSON(),
			id: timetable._id,
			image: `${process.env.IMAGE_DOMEN}/${timetable.image}`
		}
	}

	async getAll() {
		// const pageNum = (Math.abs(page) || 1) - 1;
		const timetablesData = await Timetable.find({ isHidden: false })
			// .sort({ _id: -1 }).limit(parseInt(limit)).skip(parseInt(limit) * pageNum)

		const timetables = []

		timetablesData.map((item) => {
			timetables.push({ ...item.toJSON(), id: item._id, image: `${process.env.IMAGE_DOMEN}/${item.image}` })
		})

		return { items: timetables, count: await Timetable.find({ isHidden: false }).countDocuments() }
	}

	async checkDateTimetable() {
		const findTimetable = await Timetable.find()

		await Promise.all(findTimetable.map(async (timetable) => {
			if (moment().isAfter(moment(timetable.date))) {

				if (timetable.isAuto) {
					timetable.date = moment(timetable.date).add(timetable.prolongationAutoDay, "d")

					await timetable.save()
				} else {
					await Timetable.findByIdAndDelete(timetable._id)
				}
			}
		}))
	}
}

export default new TimetableService