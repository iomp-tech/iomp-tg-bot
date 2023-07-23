import FooterPolicyService from '../Services/FooterPolicyService.js'

class FooterPolicyController {
	async create(req, res, next) {
		try {
			const block = await FooterPolicyService.create(req.body, req.files)

			return res.json(block)
		} catch (e) {
			next(e)
		}
	}

	async update(req, res, next) {
		try {
			const block = await FooterPolicyService.update(req.body, req.files)

			return res.json(block)
		} catch (e) {
			next(e)
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params

			const block = await FooterPolicyService.delete(id)

			return res.json(block)
		} catch (e) {
			next(e)
		}
	}

	async getById(req, res, next) {
		try {
			const { id } = req.params

			const block = await FooterPolicyService.getById(id)
			return res.json(block)
		} catch (e) {
			next(e)
		}
	}

	async getAll(req, res, next) {
		try {
			const block = await FooterPolicyService.getAll(req.query)

			res.header('Access-Control-Expose-Headers', 'X-Total-Count')
			res.header('X-Total-Count', block.count)

			return res.json(block.items)
		} catch (e) {
			next(e)
		}
	}
}

export default new FooterPolicyController