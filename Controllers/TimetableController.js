import TimetableService from '../Services/TimetableService.js'

class TimetableController {
	async create(req, res, next) {
		try {
			const timetable = await TimetableService.create(req.body, req.files)

			return res.json(timetable)
		} catch (e) {
			next(e)
		}
	}

	async update(req, res, next) {
		try {
			const timetable = await TimetableService.update(req.body, req.files)

			return res.json(timetable)
		} catch (e) {
			next(e)
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params

			const timetable = await TimetableService.delete(id)

			return res.json(timetable)
		} catch (e) {
			next(e)
		}
	}

	async getById(req, res, next) {
		try {
			const { id } = req.params

			const timetable = await TimetableService.getById(id)
			return res.json(timetable)
		} catch (e) {
			next(e)
		}
	}

	async getAll(req, res, next) {
		try {
			const timetable = await TimetableService.getAll(req.query)

			res.header('Access-Control-Expose-Headers', 'X-Total-Count')
			res.header('X-Total-Count', timetable.count)

			return res.json(timetable.items)
		} catch (e) {
			next(e)
		}
	}
}

export default new TimetableController