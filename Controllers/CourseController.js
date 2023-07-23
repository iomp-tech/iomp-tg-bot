import CourseService from '../Services/CourseService.js'

class CourseController {
	async create(req, res, next) {
		try {
			const course = await CourseService.create(req.body, req.files)

			return res.json(course)
		} catch (e) {
			next(e)
		}
	}

	async update(req, res, next) {
		try {
			const course = await CourseService.update(req.body, req.files)

			return res.json(course)
		} catch (e) {
			next(e)
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params

			const course = await CourseService.delete(id)

			return res.json(course)
		} catch (e) {
			next(e)
		}
	}

	async getById(req, res, next) {
		try {
			const { id } = req.params

			const course = await CourseService.getById(id)
			return res.json(course)
		} catch (e) {
			next(e)
		}
	}

	async getAll(req, res, next) {
		try {
			const courses = await CourseService.getAll(req.query)

			res.header('Access-Control-Expose-Headers', 'X-Total-Count')
			res.header('X-Total-Count', courses.count)

			return res.json(courses.items)
		} catch (e) {
			next(e)
		}
	}
}

export default new CourseController