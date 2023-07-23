import axios from 'axios'
import ApiError from '../Exceptions/ApiError.js';

import FileService from '../Services/FileService.js'

import Course from '../Models/Course.js'

class CourseService {
	async create(courseData, files) {
		if (!files.image) {
			throw ApiError.BadRequest("Фото не передано")
		}

		const { file } = FileService.saveImage(files.image, "storage/public/uploads/courses", "uploads/courses")

		if (files && files.imageDemo) {
			const { file } = FileService.saveImage(files.image, "storage/public/uploads/courses", "uploads/courses")
			courseData.imageDemo = file
		}

		courseData.image = file

		const course = await Course.create(courseData)

		return {
			...course.toJSON(),
			id: course._id,
			image: `${process.env.IMAGE_DOMEN}/${course.image}`,
			imageDemo: `${process.env.IMAGE_DOMEN}/${course.imageDemo}`
		}
	}

	async update(courseData, files) {
		const { _id } = courseData

		const findCourse = await Course.findById(_id)

		if (!findCourse) {
			throw ApiError.BadRequest("Курс не найден")
		}

		if (files && files.image) {
			FileService.deleteFile(`storage/public/${findCourse.image}`)

			const { file } = FileService.saveImage(files.image, "storage/public/uploads/courses", "uploads/courses")

			courseData.image = file
		}

		if (files && files.imageDemo) {
			FileService.deleteFile(`storage/public/${findCourse.imageDemo}`)

			const { file } = FileService.saveImage(files.imageDemo, "storage/public/uploads/courses", "uploads/courses")

			courseData.imageDemo = file
		}

		const newCourse = await Course.findByIdAndUpdate(_id, courseData, { new: true })

		return {
			...newCourse.toJSON(),
			id: newCourse._id,
			image: `${process.env.IMAGE_DOMEN}/${newCourse.image}`,
			imageDemo: `${process.env.IMAGE_DOMEN}/${newCourse.imageDemo}`
		}
	}

	async delete(id) {
		if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
			throw ApiError.BadRequest('ID не передан')
		}

		const courseData = await Course.findByIdAndDelete(id)

		FileService.deleteFile(`storage/public/${courseData.image}`)

		return { message: "Курс успешно удален", data: courseData }
	}

	async getById(id) {
		if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
			throw ApiError.BadRequest('ID не передан')
		}

		const course = await Course.findOne({ _id: id, isHidden: false })

		if (!course) {
			return {}
		}

		return {
			...course.toJSON(),
			id: course._id,
			image: `${process.env.IMAGE_DOMEN}/${course.image}`,
			imageDemo: `${process.env.IMAGE_DOMEN}/${course.imageDemo}`
		}
	}

	async getAll() {
		// const pageNum = (Math.abs(page) || 1) - 1;
		const coursesData = await Course.find({ isHidden: false }).sort({ _id: -1 })
			// .limit(parseInt(limit)).skip(parseInt(limit) * pageNum)

		const courses = []

		coursesData.map((item) => {
			courses.push({
				...item.toJSON(),
				id: item._id,
				image: `${process.env.IMAGE_DOMEN}/${item.image}`,
				imageDemo: `${process.env.IMAGE_DOMEN}/${item.imageDemo}`
			})
		})

		return { items: courses, count: await Course.find({ isHidden: false }).countDocuments() }
	}
}

export default new CourseService