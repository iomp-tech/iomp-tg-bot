import ApiError from '../Exceptions/ApiError.js';

import FileService from '../Services/FileService.js'

import FooterPolicy from '../Models/FooterPolicy.js'

class FooterPolicyService {
	async create(footerPolicyData, files) {
		if (files) {
			footerPolicyData.images = []

			Object.keys(files).map((key) => {
				const { file } = FileService.saveImage(files[key], "storage/public/uploads/footer_policy", "uploads/footer_policy")

				footerPolicyData.images.push(file)
			})
		}

		const footerPolicy = await FooterPolicy.create(footerPolicyData)

		return {
			...footerPolicy.toJSON(),
			id: footerPolicy._id,
			images: footerPolicy.images.map(image => `${process.env.IMAGE_DOMEN}/${image}`)
		}
	}

	async update(footerPolicyData, files) {
		const { _id } = footerPolicyData

		const findFooterPolicy = await FooterPolicy.findById(_id)

		if (!findFooterPolicy) {
			throw ApiError.BadRequest("Блок не найден")
		}

		if (files) {
			footerPolicyData.images = findFooterPolicy.images

			Object.keys(files).map((key) => {
				const { file } = FileService.saveImage(files[key], "storage/public/uploads/footer_policy", "uploads/footer_policy")

				footerPolicyData.images.push(file)
			})
		}

		const newFooterPolicy = await FooterPolicy.findByIdAndUpdate(_id, footerPolicyData, { new: true })

		return {
			...newFooterPolicy.toJSON(),
			id: newFooterPolicy._id,
			images: newFooterPolicy.images.map(image => `${process.env.IMAGE_DOMEN}/${image}`)
		}
	}

	async delete(id) {
		if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
			throw ApiError.BadRequest('ID не передан')
		}

		const footerPolicy = await FooterPolicy.findByIdAndDelete(id)

		FileService.deleteFile(`storage/public/${footerPolicy.image}`)

		return { message: "Блок успешно удален", data: footerPolicy }
	}

	async getById(id) {
		if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
			throw ApiError.BadRequest('ID не передан')
		}

		const footerPolicy = await FooterPolicy.findById(id)

		if (!footerPolicy) {
			return {}
		}

		return {
			...footerPolicy.toJSON(),
			id: footerPolicy._id,
			images: footerPolicy.images.map(image => `${process.env.IMAGE_DOMEN}/${image}`)
		}
	}

	async getAll() {
		const footerPolicyData = await FooterPolicy.find()

		const footerPolicy = []

		footerPolicyData.map((item) => {
			footerPolicy.push({
				...item.toJSON(),
				id: item._id,
				images: item.images.map(image => `${process.env.IMAGE_DOMEN}/${image}`)
			})
		})

		return { items: footerPolicy, count: await FooterPolicy.find().countDocuments() }
	}
}

export default new FooterPolicyService