import { validationResult } from 'express-validator';

import UserService from '../Services/UserService.js';

import ApiError from '../Exceptions/ApiError.js';

// import Role from '../Models/Role.js'
// const userRole = new Role()
// const MASTER_ADMIN = new Role({ value: "MASTER_ADMIN" })
// const MAGAZINE_ADMIN = new Role({ value: "MAGAZINE_ADMIN" })
// const MAIN_ADMIN = new Role({ value: "MAIN_ADMIN" })

// await userRole.save()
// await MASTER_ADMIN.save()
// await MAGAZINE_ADMIN.save()
// await MAIN_ADMIN.save()

class UserController {
	async register(req, res, next) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Ошибка при валидации", errors.array()))
			}

			const { email, password } = req.body
			const userData = await UserService.register(email, password)

			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body
			
			const userData = await UserService.login(email, password)

			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const token = await UserService.logout(refreshToken)

			res.clearCookie('refreshToken')
			return res.json(token)
		} catch (e) {
			next(e)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies

			const userData = await UserService.refresh(refreshToken)
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}
}

export default new UserController