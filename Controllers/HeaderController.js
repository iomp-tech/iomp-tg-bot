import HeaderService from '../Services/HeaderService.js'

class HeaderController {
	async create(req, res, next) {
		try {
			const course = await HeaderService.create(req.body)

			return res.json(course)
		} catch (e) {
			next(e)
		}
	}

	async update(req, res, next) {
		try {
			const course = await HeaderService.update(req.body)

			return res.json(course)
		} catch (e) {
			next(e)
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params

			const course = await HeaderService.delete(id)

			return res.json(course)
		} catch (e) {
			next(e)
		}
	}

	async getById(req, res, next) {
		try {
			const { id } = req.params

			const course = await HeaderService.getById(id)
			return res.json(course)
		} catch (e) {
			next(e)
		}
	}

	async getAll(req, res, next) {
		try {
			const header = await HeaderService.getAll(req.query)

			res.header('Access-Control-Expose-Headers', 'X-Total-Count')
			res.header('X-Total-Count', header.count)

			return res.json(header.items)
		} catch (e) {
			next(e)
		}
	}
}

export default new HeaderController