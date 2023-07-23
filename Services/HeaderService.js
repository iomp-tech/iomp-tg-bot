import axios from 'axios'
import ApiError from '../Exceptions/ApiError.js';

import FileService from '../Services/FileService.js'

import Header from '../Models/Header.js'

class HeaderService {
	async create(headerData) {
		const header = await Header.create(headerData)

		return {
			...header.toJSON(),
			id: header._id,
		}
	}

	async update(headerData,) {
		const { _id } = headerData

		const findHeader = await Header.findById(_id)

		if (!findHeader) {
			throw ApiError.BadRequest("Не найден")
		}
		const newHeader = await Header.findByIdAndUpdate(_id, headerData, { new: true })

		return {
			...newHeader.toJSON(),
			id: newHeader._id,
		}
	}

	async delete(id) {
		if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
			throw ApiError.BadRequest('ID не передан')
		}

		const headerData = await Header.findByIdAndDelete(id)

		return { message: "Успешно удален", data: headerData }
	}

	async getById(id) {
		if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
			throw ApiError.BadRequest('ID не передан')
		}

		const header = await Header.findById(id)

		if (!header) {
			return {}
		}

		return {
			...header.toJSON(),
			id: header._id
		}
	}

	async getAll() {
		const headersData = await Header.find().sort({ _id: -1 })

		const headers = []

		headersData.map((item) => {
			headers.push({
				...item.toJSON(),
				id: item._id
			})
		})

		return { items: headers, count: await Header.find().countDocuments() }
	}
}

export default new HeaderService