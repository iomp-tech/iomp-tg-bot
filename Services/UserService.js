import bcryptjs from 'bcryptjs'

import Role from '../Models/Role.js'
import User from '../Models/User.js'

import TokenService from './TokenService.js';

import ApiError from '../Exceptions/ApiError.js';

class UserService {
	async register(email, password) {
		const emailToLowerCase = email.toLowerCase()

		const candidate = await User.findOne({ email: emailToLowerCase })

		if (candidate) {
			throw ApiError.BadRequest(`Пользователь с таким email уже существует`, "email")
		}

		const hashPassword = bcryptjs.hashSync(password, 7)
		const userRole = await Role.findOne({ value: "USER" })

		const user = await User.create({
			email: emailToLowerCase,
			password: hashPassword,
			roles: [userRole.value],
		})

		const tokens = TokenService.generateTokens({...user.toJSON()})
		await TokenService.saveTokenUser(user._id, tokens.refreshToken)

		return { ...tokens, user }
	}

	async login(email, password) {
		const user = await User.findOne({ email })

		if (!user) {
			throw ApiError.BadRequest(`Пользователь с таким email не найден`, "email")
		}

		const isPass = await bcryptjs.compare(password, user.password)

		if (!isPass) {
			throw ApiError.BadRequest(`Пользователь с таким паролем не найден`, "password")
		}

		const tokens = TokenService.generateTokens({ ...user.toJSON() })
		await TokenService.saveTokenUser(user._id, tokens.refreshToken)

		return { ...tokens, user }
	}

	async logout(refreshToken) {
		const token = await TokenService.removeTokenUser(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		}

		const userData = TokenService.validateRefreshToken(refreshToken)
		const tokenFromDb = await TokenService.findTokenUser(refreshToken)

		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError()
		}

		const user = await User.findById(userData._id)
		const userObj = new UserDto(user)
		const tokens = TokenService.generateTokens({ ...userObj })
		await TokenService.saveTokenUser(userObj._id, tokens.refreshToken)

		return { ...tokens, user: userObj }
	}
}

export default new UserService